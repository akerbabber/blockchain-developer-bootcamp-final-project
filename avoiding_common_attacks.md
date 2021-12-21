# Contract security measures

## SWC-103 (Floating pragma)

Specific compiler pragma `0.8.9` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## Proper Use of require, assert and revert

Appropriate require statements are put at the beginning of the public functions in order to revert in case of invalid calls.

## Protection against Re-entrancy

Always update a status property **before** taking any action that involves sending eth or tokens to ensure malicious re-entrant calls to fail