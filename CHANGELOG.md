# 1.0.0 (2021-04-02)


### Features

* package now overwrites target files instead of creating a copy ([5e81432](https://github.com/ashblue/upm-package-populator/commit/5e8143287706059f28c1d31d17c8c91452080942))


### BREAKING CHANGES

* Only takes 2 arguments instead of 3. As the target destination will now be
overwritten. This should make it much easier to update and deploy the target NPM package in a single
location.
