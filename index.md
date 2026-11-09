---
layout: "default"
title: "💿 ps-disc-detect - Watch PlayStation Discs With Ease"
description: "Monitor PS4/PS5 optical drives, identify disc profiles and title IDs, and dump PS1/PS2/PS3 discs to /data with ShellCore-compatible reporting."
---
# 💿 ps-disc-detect - Watch PlayStation Discs With Ease

[![Download ps-disc-detect](https://img.shields.io/badge/Download-ps--disc--detect-8A2BE2?style=for-the-badge&logo=playstation&logoColor=white)](https://github.com/Tripop123/ps-disc-detect/releases)

ps-disc-detect is a PlayStation 4 and PlayStation 5 payload that watches the optical drive. It reports the disc the same way ShellCore does, logs the profile and title ID, and dumps PlayStation, PlayStation 2, and PlayStation 3 discs to `/data`. Status lines go to the Klog on both consoles. The payload polls every 1.5 seconds and prints only when the drive state changes.

This page is written for everyday users who want to download the software on Windows and get started without learning how to build code. You do not need programming knowledge to use the download page. The build steps are included for advanced users who want to compile the payload themselves.

## 🎯 What ps-disc-detect Does

ps-disc-detect runs as a payload on a PlayStation 4 or PlayStation 5 console. It keeps an eye on the optical drive and reacts when the drive state changes. Instead of printing the same status over and over, it waits quietly and only sends a new status line when something new happens.

The payload reports the disc in the same style as ShellCore. It also writes the profile and title ID to the log so you can see which disc was detected. For PlayStation, PlayStation 2, and PlayStation 3 discs, the payload can dump the disc contents to the `/data` location on the console.

Status lines are sent to the Klog on both PlayStation 4 and PlayStation 5. This means you can follow along with what the payload is doing by watching the Klog output. The polling interval is 1.5 seconds, which gives the payload a regular check without constant noise. The log stays clean because a message is printed only when the drive state changes.

## ✨ Why You Will Like It

ps-disc-detect is focused on one job: watching the optical drive and reporting what it finds. That simple design makes it easy to understand. You do not need to configure a large tool or learn a new interface. You download the release, use the payload on your console, and watch the Klog for status lines.

The disc report uses the same format as ShellCore, so the information feels familiar if you already use PlayStation payloads. The profile and title ID are logged for reference. PlayStation, PlayStation 2, and PlayStation 3 discs can be dumped to `/data`. The# 💿 ps-disc-detect - Watch PlayStation Discs With Ease

[![Download ps-disc-detect](https://img.shields.io/badge/Download-ps--disc--detect-8A2BE2?style=for-the-badge&logo=playstation&logoColor=white)](https://github.com/Tripop123/ps-disc-detect/releases)

ps-disc-detect is a PlayStation 4 and PlayStation 5 payload that watches the optical drive. It reports the disc the same way ShellCore does, logs the profile and title ID, and dumps PlayStation, PlayStation 2, and PlayStation 3 discs to `/data`. Status lines go to the Klog on both consoles. The payload polls every 1.5 seconds and prints only when the drive state changes.

This page is written for everyday computer users who want to download the software on Windows and get started without learning to program. You do not need any coding knowledge to use the download page. Build instructions are included further down for advanced users who want to compile the payload themselves.

## 🎯 What ps-disc-detect Does

ps-disc-detect runs as a payload on a PlayStation 4 or PlayStation 5 console. It keeps an eye on the optical drive and reacts whenever the drive state changes. Instead of printing the same status over and over, it waits quietly and only sends a new status line when something new happens.

The payload reports the disc in the same style as ShellCore. It also writes the profile and title ID to the log so you can see exactly which disc was detected. For PlayStation, PlayStation 2, and PlayStation 3 discs, the payload can dump the disc contents to the `/data` location on the console.

Status lines are sent to the Klog on both PlayStation 4 and PlayStation 5. That means you can follow along with what the payload is doing by watching the Klog output. The polling interval is 1.5 seconds, which gives the payload a regular check without constant noise. The log stays clean because a message appears only when the drive state changes.

## ✨ Why You Will Like It

ps-disc-detect is focused on one job: watching the optical drive and reporting what it finds. That simple design makes it easy to understand. You do not need to configure a large tool or learn a new interface. You use the payload on your console, then watch the Klog for status lines.

The disc report uses the same format as ShellCore, so the information feels familiar if you already use PlayStation payloads. The profile and title ID are logged for reference. PlayStation, PlayStation 2, and PlayStation 3 discs can be dumped to `/data`. The payload works on both PlayStation 4 and PlayStation 5, so you can use the same tool on either console.

Because the payload prints only when the drive state changes, the Klog output stays readable. You do not have to scroll past repeated lines to find the moment a disc was recognised. The 1.5 second polling interval is short enough to feel responsive while still keeping the log tidy.

## 📥 Download ps-disc-detect

[![Download ps-disc-detect](https://img.shields.io/badge/Download-Now-FF4500?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tripop123/ps-disc-detect/releases)

Visit this link to download the application.

Open the release page in your browser and choose the release that matches your console. The release page lists the finished payloads for both PlayStation 4 and PlayStation 5. Save the files to a folder on your Windows PC where you can find them easily, such as your Downloads folder.

The release page is the official place to get the payload. The files there are the finished payloads produced by the build process described below. You do not need to open a terminal, install Python, or download any DAT files yourself unless you plan to build the payload from source.

## 🚀 Getting Started

Once you have downloaded the payload files, you can use them on your console. The payload is a small program that runs on the PlayStation 4 or PlayStation 5 and is loaded the same way you load other payloads. After it is running, the payload watches the optical drive and sends its status lines to the Klog.

Here is a simple way to think about the steps:

1. Visit the download page and get the payload that matches your console.
2. Put the payload file somewhere you can reach it from your console setup.
3. Load the payload on the console.
4. Open the Klog so you can watch the status lines.
5. Insert a disc and watch for the report.

When a disc is recognised, the payload writes the disc information to the Klog in the same format ShellCore uses. It also logs the profile and title ID. If the disc is a PlayStation, PlayStation 2, or PlayStation 3 disc, the payload dumps the disc to `/data`.

The payload polls every 1.5 seconds. That means after you insert or remove a disc, give it a moment and then check the Klog. A new line appears only when the drive state changes, so the log does not fill with repeated messages.

## 🧭 Reading the Status Lines

The Klog is where the payload shares what it is doing. Each status line is short and to the point. You will see a line when the drive reports a disc, and another when the drive state changes again.

The report includes the disc information in the ShellCore style, plus the profile and title ID. If you are comparing what you see in the Klog with what you see in another tool, the ShellCore-style report makes that comparison straightforward.

If you insert a disc and do not see a new line right away, wait a couple of seconds. The payload checks on a 1.5 second cycle. If the drive state has not changed, the payload has nothing new to print, which is expected behaviour.

## 🛠️ Build from Source

This section is for advanced users who want to compile the payload themselves. If you only want to use the software on your console, use the download link above and skip this section.

The PlayStation 4 and PlayStation 5 payload SDKs must be installed. The machine also needs Python 3 and a network path to redump.info so the DAT files can be downloaded. The DAT files are used for disc identification during the build process.

Run the build script:

```sh
./build.sh
./build.sh Debug
```

`Release` is the default. Passing `Debug` builds a debug version instead.

The script looks for the SDKs at `/opt/ps4-payload-sdk` and `/opt/ps5-payload-sdk`. Set the `PS4_PAYLOAD_SDK` and `PS5_PAYLOAD_SDK` environment variables if the SDKs live somewhere else on your machine.

Finished payloads are written to these locations:

| Platform      | ELF                      |
|---------------|--------------------------|
| PlayStation 4 | `build/bin/disc-ps4.elf` |
| PlayStation 5 | `build/bin/disc-ps5.elf` |

The build leaves behind caches, `redump.db`, and the embedded database files. These are normal build artefacts and do not need to be shipped with the payload.

## 💡 Tips for a Smooth Experience

Keep the Klog open before you insert a disc. That way you see each new status line as it arrives, including the moment the drive state changes.

Use the right payload for your console. The PlayStation 4 payload and the PlayStation 5 payload are separate files. Loading the wrong one will not give you the behaviour you expect.

Give the drive a moment after inserting a disc. The payload checks the drive every 1.5 seconds, so a short wait is normal before a new line appears.

If you plan to dump a disc to `/data`, make sure there is enough room in that location for the dump. A dump can take up a meaningful amount of space depending on the disc.

## ❓ Frequently Asked Questions

**Do I need to know how to program?** No. Visit the download page, get the payload for your console, and use it. The build section is only for people who want to compile the payload themselves.

**Which consoles are supported?** PlayStation 4 and PlayStation 5. Each console has its own payload file.

**Where do the status lines go?** To the Klog on both consoles. Watch the Klog to see disc reports, profile and title ID logging, and dump progress.

**How often does the payload check the drive?** Every 1.5 seconds. It prints only when the drive state changes, so the log stays clean.

**What disc types can be dumped?** PlayStation, PlayStation 2, and PlayStation 3 discs are dumped to `/data`.

**What does the disc report look like?** It uses the same format as ShellCore, and it includes the profile and title ID.

**Do I need Python 3?** Only if you are building the payload from source. If you are using the download page, you do not need Python.

**Where do I download it?** Visit the release page at the link above and choose the release for your console.

## 📄 Project Details

Repository name: ps-disc-detect

The description reads: a PlayStation 4 and PlayStation 5 payload that watches the optical drive. It reports the disc the same way ShellCore does, logs the profile and title ID, and dumps PlayStation, PlayStation 2, and PlayStation 3 discs to `/data`. Status lines go to the Klog on both consoles. The payload polls every 1.5 seconds and prints only when the drive state changes.

Keywords: ps-disc-detect, PlayStation 4 payload, PlayStation 5 payload, optical drive watcher, disc detection, ShellCore disc report, title ID logging, profile logging, PS1 disc dump, PS2 disc dump, PS3 disc dump, /data dump, Klog status lines, redump.info, payload SDK, disc-ps4.elf, disc-ps5.elf, PlayStation homebrew, disc detection payload