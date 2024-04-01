# GroceryStore
Hybrid E-Commerce Application for managing the local Retailer Shop

## Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# Using Yarn
yarn android
```

### For iOS

```bash
# Using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## PR Flow will be as follows:
  1. Create a new branch from `develop` branch. 
  2. When changes are done on your newly created branch then raise a PR to develop from your newly created branch. 
  3. Add a `reviewer` to the PR. 
  4. Attach the PR with the related issue
  5. When review has approved then changes, then the PR will be merged to `develop`.

  Note: *Changes of develop branch will be merged to `master` by mentors*

## Steps to contribute:

- Clone the repository
- Production branch `master`
- Development branch `develop`
- Create new branch for each feature with type prefix ( *Mind the casing* ):
  - Types are as follows `[ feature | hotfix | bugfix | release | docs  ]`
    - `feature/user-authentication` - For feature branch
    - `hotfix/ticket-no-description` - For any Hotfixes

## Commit convention to follow:

- Specify the type of the commit as prefix and then write the commit message, examples as follows:
- Types are as follows: `[ feat | docs | test | perf | chore | refactor | bugfix | hotfix | etc. ]`
  - feat: "commit message"
  - bugfix: "commit message"
  - refactor: "commit message"
  - etc.


### Happy Coding 😊