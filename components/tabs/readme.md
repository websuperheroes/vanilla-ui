# Vanilla UI - Tabs

## Tabs

This component is a set of tabs and associated tab panels.

It allows multiple panels to be contained within a single window, using tabs as a navigational widget for switching between them.


## Accessibility

The component has been created in accordance with the WAI ARIA guidelines for tabs which can be found here in full - [http://www.w3.org/TR/wai-aria-practices/#tabpanel](http://www.w3.org/TR/wai-aria-practices/#tabpanel).

In summary the following approach has been applied:

### Tab Order

* Only the active tab is in the browsers tab order.

* A default tab is specified that is active when the component is initialized.


### ARIA Roles

* Assigns the `aria-controls` relationship of a tab to the ID of its tabpanel.

* The role of `tablist` is applied to the container for the tab set with each individual tab having their role attribute set to `tab`.

* The selected state of each tab is managed by its `aria-selected` state.

* The content panel uses the role `tabpanel`.

* `Aria-hidden`, to hide the unselected tab panel

* When an tab is selected the following states are toggled: `aria-selected` in both tab elements and `aria-hidden` on both tab panels.


### Keyboard Users

* Tab - only the active tab is in the tab order. The user reaches the tabbed panel component by pressing the tab key until the active tab title receives focus.

* Left Arrow - with focus on a tab, pressing the left arrow will move focus to the previous tab in the tab list and activate that tab. Pressing the left arrow when the focus is on the first tab in the tab list will move focus and activate the last tab in the list.

* Right Arrow - with focus on a tab, pressing the right arrow will move focus to the next tab in the tab list and activate that tab. Pressing the right arrow when the focus is on the last tab in the tab list will move focus to and activate the first tab in the list.

* Up arrow - behaves the same as left arrow in order to support vertical tabs

* Down arrow - behaves the same as right arrow in order to support vertical tabs


### CSS Fallbacks

* CSS selectors are used to bind aria-hidden and CSS display: none.

* CSS selectors are used to bind aria-selected and the classes for selected or non selected tab panels.


### Users without Javascript

* There is a fallback using named anchors to jump to that piece of content.  `.no-js` class applied to the body to restyle.


