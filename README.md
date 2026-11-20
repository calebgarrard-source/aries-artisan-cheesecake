# Arie's Artisan Cheesecake: website concept

A redesign concept for Arie's Artisan Cheesecake, a cheesecake shop with counters in Evans and Augusta, Georgia. Designed and built by Caleb Garrard.

This is not the shop's website. Its live site is [ariesartisancheesecake.com](https://ariesartisancheesecake.com/). The logo, the photographs, the menu, the prices and the reviews belong to Arie's Artisan Cheesecake and its customers, and are shown here only to present the concept to the shop.

## What is here

One static page, no build step.

- `index.html`: the page
- `assets/site.css`, `assets/site.js`: its styles and behavior
- `assets/img/`: the shop's own photographs, resized
- `assets/fonts/`: Josefin Sans and Mulish (SIL Open Font License)
- `assets/motion/`, `assets/moments/`: the motion layer the page loads

## How it behaves

- The box builder hands a finished box to the cart on the shop's own online store. Nothing is ordered from this page.
- A box in progress is kept in the visitor's browser, so a reload does not empty it.
- The catering form and the newsletter sign-up do not send. Each says so after its own checks.
- Open-now, the shipping cutoff and the closest-shop button run in the visitor's browser. Location is read once and never leaves the page.

## Before it could go live

- Remove the `noindex` tag and the "Concept preview" line in the footer.
- Point `canonical`, `og:url` and `og:image` at the shop's own domain.
- Wire the catering form and the newsletter sign-up to the shop's own services.
- Confirm hours, prices and policies with the shop.
