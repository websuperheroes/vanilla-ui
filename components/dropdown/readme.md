# Vanilla UI - Dropdown

## Dropdown

A widget that when clicked provides a dropdown.  Typically this would be a push button that is used to invoke a menu. It appears as a normal button typically with a downward pointing arrow or triangle as a visual cue that it triggers the display of a menu.

Menu buttons are used in situations where authors want to provide a single menu without having to construct a complete menu bar.


## Accessibility

The component has been created in accordance with the WAI ARIA guidelines for tabs which can be found here in full - [http://www.w3.org/TR/wai-aria-practices/#menubutton](http://www.w3.org/TR/wai-aria-practices/#menubutton).

In summary the following approach has been applied:

### General

* When presenting a menu, it is always completely visible on screen.

* The menu items do not appear in the tab order until opened.


### ARIA Roles

* The menu button itself has a role of `button` and `aria-haspopup` set to "true" so an assistive technology knows that the button has a sub menu.

* The menu button has an `aria-expanded` set to "false".

* The menu is not a DOM child of the button and is therefore referenced using `aria-owns` on the button.

* The dropdown container has a role of `menu` and `aria-labelledby`.

* The menu items inside the dropdown have the roles `menuitem`


### Keyboard Users

* Space or Enter - With focus on the button pressing Space or Enter toggles the display of the drop-down menu. Focus remains on the button.

* Down Arrow -
    - With focus on the button and no drop-down menu displayed, pressing Down Arrow opens the drop-down menu and moves focus into the menu and onto the first menu item.
    - With focus on the button and the drop-down menu open, pressing Down Arrow moves focus into the menu onto the first menu item.

* Up and Down Arrow - With focus on the drop-down menu, the Up and Down Arrow keys move focus within the menu items, "wrapping" at the top and bottom.

* Escape - Closes drop-down menu

* Tab
    - With focus on the button pressing the Tab key will take the user to the next tab focusable item on the page.
    - With focus on the drop-down menu, pressing the Tab key takes the user to the next link or if the last link then the next tabbable item on the page.
    - TODO: Typing a letter (printable character) key moves focus to the next instance of a visible node whose title begins with that printable letter.


### CSS Fallbacks

...


### Users without Javascript

...


