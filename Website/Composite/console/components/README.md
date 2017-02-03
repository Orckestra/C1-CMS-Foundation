# View components

There are two types of component in use. Presentation components have the role of providing visual elements to render information and initiate actions based on the properties provided to them. Container components render nothing, but instead are tasked with collating state information and functionality for use by the presentation components.

## Presentation

These components are almost invariably stateless, rendering based on the properties they are given and do not directly access the application state. To provide functionality, they must be given functions as properties, which they may then use in event handlers etc. Any component state (as seen in `Splitter.js` and to a lesser degree in `HelpIcon.js`) should be seen as ephemeral and expendable, as presentation components are recreated and rerendered very often. Given the same properties, a presentation component should always render the same output. Styling is provided by [`styled-components`](https://github.com/styled-components/styled-components).

## Container

These are constructed with the `react-redux` library, which provides ways to connect a Redux state with a React component by mapping state and action dispatcher to properties. A container component will always have a state mapping function (usually named `mapStateToProps()`), and may have a dispatch mapper (usually named `mapDispatchToProps()`). The former takes the current state of the application, selects the data used for the presentation component it connects, and provides a property object. The latter does the same, except it takes the `dispatch()` function of the connected state store, and a number of action creator functions. The two objects are then merged to create the property object for the component. This structure is used for all container components, with very little variation.

## `colors.js`

This file contains a set of color objects for use when styling elements. Feel free to add to this file. A potential improvement might be to exploit the theming functionality in `styled-components`.
