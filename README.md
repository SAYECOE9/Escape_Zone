<img width="1600" height="748" alt="Screenshot 2026-10-06 at 11-55-59 Escape_Zone" src="https://github.com/user-attachments/assets/69566dca-a244-4912-a9ed-33bb8ee68a34" />
# Escape_Zone


<div align="center">

# 🚪 ESCAPE ZONE
### *A Lightweight 2D HTML5 Canvas Survival & Puzzle Game*

[![License: MIT](https://img.shields.io/badge/License-MIT-00e5a0.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<p align="center">
  <b>Infiltrate, collect, activate, and survive!</b><br>
  An action-puzzle game built from scratch with pure Vanilla JavaScript and HTML5 Canvas API.
</p>

</div>

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Gameplay Mechanics](#-gameplay-mechanics)
- [Controls](#-controls)
- [Technical Architecture](#-technical-architecture)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 📖 Overview

**Escape Zone** is a fast-paced, top-down 2D puzzle-survival game. Players must navigate a complex maze, dodge hostile AI security units, collect resources, solve sequence-based switches, and locate the exit key before time runs out or health drops to zero.

The game is entirely self-contained with **zero external dependencies or libraries**, demonstrating high-performance 2D Canvas rendering, Delta-Time smooth movement physics, and real-time collision dynamics.

---

## ✨ Key Features

- **⚡ Zero Dependencies:** Built using 100% native Web standards (Vanilla JS, HTML5 Canvas, CSS Grid/Flexbox).
- **🎯 Dynamic Enemy AI:** Enemies dynamically calculate vectors to track the player while respecting wall boundaries (AABB collision).
- **📈 Progressive Difficulty Scaling:** Enemy speed increases dynamically with each cleared level.
- **🛡️ Custom Render Engine:** Custom shadow rendering, dynamic light glows, particle-free health animations, and responsive canvas sizing.
- **⏱️ Frame-Rate Independent Physics:** Delta-time (`dt`) calculation guarantees consistent movement speed regardless of monitor refresh rates (60Hz, 120Hz, 144Hz+).
- **🎨 Glassmorphism HUD:** Sleek, modern dark-mode user interface with real-time objective tracking.

---
cd Escape_Zone

## 🎮 Gameplay Mechanics

To successfully clear a level and unlock the exit portal, you must complete four sequential missions:
