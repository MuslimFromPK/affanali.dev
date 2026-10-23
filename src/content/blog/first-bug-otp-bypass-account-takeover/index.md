---
title: 'My First Bug | Account takeover through OTP bypass'
description: "My first ever bug and write-up: an OTP field with no rate limiting let me brute-force the code and take over an account on my ISP's website."
pubDate: 2023-06-30
updatedDate: 2023-12-19
tags: [otp-bypass, find-your-first-bug, hacking, bug-bounty, account-takeover, migrated]
originalUrl: https://muslimfrompk.medium.com/my-first-bug-account-takeover-through-otp-bypass-449e3d761680
---

Assalam-O-Alaikum!

## Introduction

> My name is Affan Ali. I am a 1* years old bug bounty hunter from Pakistan.It is my first writeup on Medium and also my first writeup of life.

One day I just went to the ISP's website to see my remaining internet usage.When I entered my mobile number in it it asked me for OTP(One Time Password) it was not new for me because I browsed it hundred of times before.But now I was thinking as a hacker so I decided to test if it has a rate limiting functionality.There was no rate limiting functionality out there so I was able to bruteforce the OTP field and the interesting thing is that there is no other protection except OTP there is no password.

## Steps to reproduce

1. Launch Burp suite or Owasp Zaproxy(I prefer Zap but launch what you want) and Enable the intercept option in Burp or Break on all request and responses on burp with your browser proxy running
2. After entering my phone number,I clicked on the Continue button
3. It will ask you to enter the OTP.
4. Enter a wrong OTP(you can use any length there is not limit of this) and press Continue button.
5. Capture the request in proxy send it to Intruder(Burp) or Fuzzer(Zap).
6. Set payload position on the OTP field and start the attack since there is no rate limiting .
7. After some time you will notice that there is a response with a different size open its request,copy the OTP code and paste it on the website.
8. I successfully logged in and I was able to see all of my invoices,current balance etc .But it can be of any users whose phone number I have.

My ISP has no public bug bounty program so I decided to send this report through Openbugbounty.org.

<https://openbugbounty.org>

I submitted it around one week ago but openbugbounty.org has not processed it yet so I don't recommend this platform.I hope my report will be processed soon I will edit this article if they respond.It is a vulnerability type that you will find on most of the websites not only on OTP field but also on password and/username fields.So keep this in mind.

I am not a native English speaker so please give me suggestion if any improvement is needed and forgive me grammar and spelling mistakes.I know they are hundreds in my write-up but nothing is perfect from start.

It was my first write-up.I hope you will find something to learn from this article.

We all are here to learn,hack and just hack.

If you have question or need a fellow hacker you can ping me at twitter:[@muslimfrompk](https://twitter.com/muslimfrompk)
