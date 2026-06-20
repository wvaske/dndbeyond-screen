# D&D Beyond DM Screen

This project provides a DM screen for D&D Beyond <https://dndbeyond.com>. This screen brings all of a character's public campaign members into a single page with DM-relevant stats. The idea here is to reduce the number of tabs a DM may need to open.

![DM Screen](https://user-images.githubusercontent.com/5890607/69019100-fc728f80-0963-11ea-9305-9f603e261585.jpg)

**!! Important: D&D Beyond does not currently provide an official API. The functionality for this screen is based upon using endpoints that may change or go away at any point. Additionally, D&D Beyond implements rate limiting for accessing these endpoints. Accessing too many characters too frequently may cause a temporary block which requires you to complete a captcha on the main D&D Beyond website.**

## Requirements

* PHP 7.4 or greater (including PHP 8.x)
* Composer <https://getcomposer.org/>
* Symfony CLI <https://symfony.com/download> -OR- an existing webserver
  * If using Symfony CLI, you must have version 4.10.1 or higher
* Yarn <https://yarnpkg.com/lang/en/docs/install/> or npm

## Installation

```sh
git clone git@github.com:swichers/dndbeyond-screen.git
cd dndbeyond-screen
composer install
symfony serve
```

If you are not using the Symfony CLI then you must set up whichever webserver you plan on using. Running `composer install` should also build the required frontend assets for the project. After the project has finished building, and the site is accessible, open it in your browser.

### Alternative: Using npm instead of Yarn

If you don't have Yarn installed, you can use npm:

```sh
composer install
npm install
npm run build
# Start server with Symfony CLI
symfony serve
# OR use PHP built-in server
php -S 127.0.0.1:8000 -t public
```

### Building Frontend Assets with Node.js 17+

If you're using Node.js 17 or newer, you may encounter OpenSSL errors when building. Use the legacy OpenSSL provider:

```sh
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

## Usage

Open `http://127.0.0.1:8000` in your browser. Enter the Character ID for a public D&D Beyond character. You will be presented with a list of all characters in the campaign. The Character ID is the number available when viewing a character on D&D Beyond.

## Troubleshooting

### PHP 8.5+ Fatal Error in CurlResponse.php

If you encounter a `FatalErrorException` in `vendor/symfony/http-client/Response/CurlResponse.php` around line 330, this is due to a return type incompatibility with PHP 8.5+.

**Quick fix:** Edit `vendor/symfony/http-client/Response/CurlResponse.php` line 323 and remove the `: int` return type declaration:

```php
// Change this:
private static function select(ClientState $multi, float $timeout): int

// To this:
private static function select(ClientState $multi, float $timeout)
```

This is a known compatibility issue with the older Symfony 4.4 HttpClient component and PHP 8.5. The vendor files are not tracked in git, so this fix needs to be applied after running `composer install`.

**Note:** This is a temporary workaround. For production use, consider upgrading to a newer Symfony version that fully supports PHP 8.5.
