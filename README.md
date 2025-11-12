# FaithFrontier

This repository is configured for GitHub Pages using Jekyll.

## Structure

The repository includes the following directories ready for your content:

- `_layouts/` - Place your layout templates here
- `_includes/` - Place your reusable content snippets here
- `_posts/` - Place your blog posts here (format: YYYY-MM-DD-title.md)
- `_cases/` - Custom collection for cases
- `_essays/` - Custom collection for essays
- `assets/css/` - Place your CSS files here
- `assets/js/` - Place your JavaScript files here
- `assets/images/` - Place your images here

## Configuration

The `_config.yml` file is configured for GitHub Pages compatibility. To use a custom domain:

1. Uncomment and update the `url` field in `_config.yml` with your custom domain
2. Add a CNAME file to the repository root with your domain name
3. Configure your DNS settings to point to GitHub Pages

## Building Locally

To build and preview the site locally:

```bash
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000` in your browser.

## Deploying to GitHub Pages

1. Ensure your default branch is set to `main` in repository settings
2. Go to repository Settings > Pages
3. Set the source to deploy from the `main` branch
4. Your site will be published at `https://[username].github.io/[repository]` or your custom domain

## Adding Content

Simply add your files to the appropriate directories and commit them. Jekyll will automatically process and publish them on GitHub Pages.
# Faith Frontier — Jekyll Site

This repository powers **faithfrontier.org**.

- `_cases/` — Markdown case records (no PDFs or binary assets).
- `_essays/` — Long-form essays and commentary.
- `assets/cases/` — Case PDFs, exhibits, and other binary files (you will add these).
- `/cases/` — Public case index page.
- `/essays/` — Public essays index page.

To use:

1. Add or edit case records in `_cases/`.
2. Place PDFs and exhibits under `assets/cases/<docket>/` and update the `assets_dir` and `documents` fields in each case file.
3. Push to GitHub and connect the repository to your `faithfrontier.org` domain.
