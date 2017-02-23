# Starting a new feature of the console

Because the console is structured as separate, self-contained parts, adding to it is a question of identifying which parts it will need, and adding them. Typically, this will be an underlying state storage, a connecting container, and a number of presentation components.

The majority of this development cycles between writings tests, running tests, writing the desired code, running tests again, etc. Follow TDD practices, and your life will be easier.

## When to add state

The first thing to identify is whether new state structure is required to fulfill the function of the new feature. In many cases it will not - instead, existing reducers can be employed. This is the case if the feature e.g. needs to add a definition type (i.e. something like a opage definition or dialog definition), or needs to store a list of data that will not be changed on the client. Reducers and thunks already exist for these purposes, and can easily be adapted to encompass the new state, far easier than reinventing the wheel.

Assuming that there is a need for new state structures, the place to start is with the reducer. Identify which actions it needs in order to function, then construct the action creator functions first. Then, build the reducer to apply actions to the state. Any new thunks should be added after the reducer, and rely on actions from it to handle their activities.

## How to add components

Container components do not render anything at all, but instead are tasked with transforming state data into properties for presentation components. Creating these first has the advantage of being able to put the presentation component(s) on screen with proper data, and will also allow the two to grow together as the feature expands. This is also when thought should be given to building selectors.

To present the data to the user and allow them to manipulate it is the last piece of the puzzle. Start with identifying a basic markup structure, then create styled components of a suitable type and use these to build the layout. Once you have basic layout and content, you can get to work on styling and layout in earnest, adding CSS to the styled components. This, finally, is where your attention should shift from tests to what displays in the browser - but keep in mind that if you change the rendered output without changing tests to fit, you're losing the advantages of your tests. Any time you change things that are not CSS, do so in the tests first.

## Closing the loop

Functions intended to be called when buttons are pressed, etc. are likely one of the last steps in construction. Container components have ways to hook up action creators and the dispatch of their results, and if you look through existing container components you will notice a currying structure: `(x, y) => z => dispatch(makeAction(x, y, z))` - so calling this function first with two parameters gives you a function that takes one parameter, which when called will dispatch an action using all three parameters passed. This is useful for when you are nesting presentation components.

In our example, a parent component might have the first two available, while a child component can provide the final one when performing an action in the UI. In this case, the parent would simply call the function passed from the provider, and pass the result along as a property to the child component(s). Many variations on this theme are possible, and it is central to how container components provide functionality to presentation components.

# Thoughts about packages

**The following section is about how to use and expand the console architecture to accept UI code provided by packages.**

A proper system for handling UI provided by packages has not yet been put in place, but some of the means to do it are in place, and others could be modeled on them.

## Adding actions and thunks

Adding functionality to the action locator is as simple as calling a register function. The function registered should be a 'dispatchable' - i.e. an action creator or thunk creator whose results can be fed to the state store's dispatch function. Accessing them can then be done by using them in a provider, or manually drawing them from the action locator for use. As such, adding new thunks or actions in a package should be easy enough.

## Adding reducers

It is safe to add reducers to the state because they are contained to operating within a single area of the state data. A similar system to the action locator's registry, but for reducer functions, could be used to collate the reducers before constructing the state store. It would need to be done at load time, but page reloads are commonly part of package installation, anyway, and may be faster and less disruptive with various measures possible with the new UI (such as storing layout information in local storage).

## Adding visual elements

Given the UI system of the console, the entry point for this will typically be at perspective, page, or tab level, or alternatively dialog or dialog pane level. These places are mostly served by rendering a `SwitchPanel` component, which selects a component class based on properties given to it and renders it. Dialogs have their own functionality for panes, but operate on similar principles. As such, the type maps used here can be generalized and made into a registry, allowing packages to provide their own types.
