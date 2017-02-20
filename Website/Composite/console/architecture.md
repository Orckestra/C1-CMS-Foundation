# Overall architectural reasoning

The existing C1 system is widely based on being able to define new data types, expand the system through plugins, and having the console respond dynamically. The aim is to retain these qualities, while improving and expanding capabilities and quality.

The three main headings below lay out the ways this has been accomplished and further planned out.

## Data driven

The server is the central source of information about a given installation of C1. As such, the console interface must be able to take information presented by the server and visualize it in a clear manner. To this end, the server can feed out data structures that tell the console UI what to render and where, reusing elements wherever possible. All information is kept in an immutable state store, updated only in well-defined actions.

The structure of the application is based on the concept of layout levels and layout definitions. At the root, a perspective explorer provides access to a set of perspectives, which each contain pages. Pages may contain tabs, which in turn may show e.g. a preview or browse location. Atop this, dialogs provide modal operations. All of these are backed by definitions allowing a variety of different components to be used to render them. Activities in the console can be defined by defining them as providers - data structures containing information about performing a particular operation - and incorporated in structure definitions. Thus, application structure _is_ data in this console.

The structure data provides the means to visualize the content data, which is what defines the look and behavior of the site. The state can store a number of varieties these. Of note here are form data, which contains information filled into a form display; options, which contain settings in toolbars; layout, which contains the current display layout of the console, and tree nodes, which straddle the divide between data and structure by representing the nodes in data browsing trees (as seen in the main browsing pages of perspectives).

## Encapsulated

### Rendering

Everything which is rendered in the console is a component. React.js handles components as self-contained pieces of code which, when fed properties, render a virtual DOM element. The great advantage of this is that it then becomes possible to reuse these elements extensively. The same tab bar that provides access to an editing page's multiple tabs also gives access to the pages open in a perspective. The same button code is used in toolbars and dialogs, etc.

This is furthered by the container components, which themselves do not render anything, but instead are tasked with providing properties to presentation components, drawing data from the state store via selectors. You can see it as container components providing structure and context, and presentation components rendering on-screen content.

### State

The state store itself is constructed from a number of state transformation functions, called reducers, which apply the effects of actions to the state. These reducers are and should be self-contained, and a given reducer should be authoritative within its area of influence - i.e. no two reducers should modify the same state. It is possible, and completely workable, for a reducer to delegate responsibility for a segment of state to a sub-reducer, but in that case the child reducer is the authoritative handler of that segment, and the parent reducer must not interfere.

Action creators should in general coexist with the reducer that operates on them, though this is less critical. See the `activity` reducer for a counterexample that sets state based on a broad list of actions that are not located in the same code file.

Thunks should not directly create state-changing actions, apart from their own activity tracking actions (i.e. the ones declared in the thunk source file, with suffixes like `_COMMENCE`, `_DONE` or `_FAILED`). Instead, they should use the action creator functions for their required actions, so as to ensure that actions are created correctly, and to avoid repeating code.

Selectors are the final link connecting state data into UI components. Each is a function that takes a state object, and derives the sought data by combining information across state segments (i.e. reducer domains). This is safe, because selectors must be pure functions, and may only take the state object as a parameter. Selectors created via `reselect` are also memoized by default, and should provide good performance. If needed, it is possible to build custom memoization.

## Tested

Test coverage of code is crucial. It has been shown to be one of the most effective tools at finding and eliminating, as well as preventing bugs. Test driven development is one of the best tools for ensuring high coverage, as it means constructing the tests while building the code that is tested. So in short, writing tests will save you time, and both you and your customers pain. No excuses, test your code.
