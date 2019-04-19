# @phenomnomnominal/protractor-use-mocha-hook

[![npm version](https://img.shields.io/npm/v/@phenomnomnominal/protractor-use-mocha-hook.svg)](https://img.shields.io/npm/v/@phenomnomnominal/protractor-use-mocha-hook.svg)
[![Code Climate](https://codeclimate.com/github/phenomnomnominal/protractor-use-mocha-hook/badges/gpa.svg)](https://codeclimate.com/github/phenomnomnominal/protractor-use-mocha-hook)
[![Test Coverage](https://codeclimate.com/github/phenomnomnominal/protractor-use-mocha-hook/coverage.svg)](https://codeclimate.com/github/phenomnomnominal/protractor-use-mocha-hook/coverage)

## Installation

```zsh
npm install @phenomnomnominal/protractor-use-mocha-hook --save-dev
```

## Why?

This package is the culmination of a bunch of attempts to get Mocha hooks working well with Protractor, including when running tests in parallel.

This comment from [Tractor](https://github.com/TradeMe/tractor) describes some of the genesis:

```javascript
// HACK:
// This is a bit weird. We want to run some code after each Mocha spec runs,
// so we can add extra data to the test report.
//
// FIRST ATTEMPT: Use Mocha's `afterEach` in a Protractor plugin.
// Tried calling `afterEach in the  `onPrepare` lifecycle took, but
// the global Mocha hooks aren't available yet.
//
// SECOND ATTEMPT: Move hooks to a separate file.
// By moving the hook calls to a separate file, we can push that file into
// the list of specs. This works well when running all the specs in serial,
// but stops working when running them in parallel, as the separate file will
// be run in a separate process.
//
// THIRD ATTEMPT: Use Mocha's `after` hook in a Protractor plugin.
// In the `postTest` part of a Protractor plugin, we have access to the
// `after` hook, so we can use that to attach the hook. Unfortunately,
// the `after` hook happens outside the context of the running test,
// so you can't attach the information to the right test.
//
// FOURTH ATTEMPT: Use Mocha's `afterEach` hook in a Protractor plugin.
// In the `postTest` part of a Protractor plugin, we have access to the
// `afterEach` hook. That's great, and we also have access to the right
// test context. Unfortunately, the hook will be added for *each* test!
// So we have to add a flag and make sure we only add the hook once
// per process.
```

This repo contains the *FIFTH* attempt, adding a setter which allows you to add a hook as soon as Mocha has added it to the global context. It is *definitely* still a hack 😅.
