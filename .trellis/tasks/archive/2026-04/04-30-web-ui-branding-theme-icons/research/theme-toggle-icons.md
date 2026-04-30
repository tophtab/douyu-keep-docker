# Theme Toggle Icon References

## Summary

Shadcn-style theme controls commonly expose light, dark, and system choices while using icons to make the current appearance option scannable. The relevant mapping for this task is sun = light, moon = dark, and a device/monitor icon = system or automatic mode.

## References

* Shadcn UI dark mode mode-toggle example: https://ui.shadcn.com/docs/dark-mode/tanstack-start
  * Shows a mode toggle with `Light`, `Dark`, and `System` choices.
  * Uses sun and moon icons for light/dark visual states.
* shadcn.io theme toggle examples: https://www.shadcn.io/examples/switch-theme-toggle-with-icons
  * Notes that icon cues make theme choices obvious and recognizable.

## Application To This Project

* Use inline SVG icons inside the existing single-file Docker Web UI rather than adding a React/shadcn dependency.
* Preserve existing config values: `light`, `dark`, and `system`.
* Implement the system option as a monitor/client icon because the user requested a client icon for automatic mode.
