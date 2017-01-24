#### Architecture
One main script will keep track of the setting selected in each of the
control panels. When any setting is updated, a renderFractal method will
be called. The actual function that calculates the pixel colors to draw
the fractal will live in a separate script called drawMandlebrot. Yet
another script will manage the color settings.

Scripts:
- main.js
- drawMandlebrot.js
- updateColors.js

Several canvases will be stacked on top of each other to improve UI. At
the lowest level the fractal canvas will hold the image. Then, a
transparent grid canvas will hold a reference grid to show the current
real/imaginary components of square that is currently in view. Finally,
a transparent dragging canvas will live on top that allows the user to
grab and drag the image to pan around fractal. This will be in addition
to panning with the arrow keys or arrow buttons.

Canvas stack:
- dragging
- grid
- fractal

### Implementation Timeline

**Day 1**:
Set up the basic layout, including the layered canvases.
Implement the grid to show coordinates and the dragging canvas to allow
panning.

Day 1 goals:
- Have components appear on screen.
- Implement grid and panning.

**Day 2**:
Get the Zoom feature to zoom the viewport in on. Get the drawMandlebrot
function to render a two-color image of the Mandlebrot set with a static
value for the maximum number of iterations calculated. Then, make the
maximum iterations value dynamic so the user can select how detailed
he or she wants the image to be.

Day 2 goals:
- Have basic 2-color Mandlebrot image rendering on the canvas
- make MAX_ITERATIONS variable set dynamically.

**Day 3**:
Get the color picker feature working so that the user can choose what
colors the image will be. Then, enhance the color picker to include a
cycleLength variable. The color cycle will repeat up to the MAX_ITERATIONS
value. So, for example if a user selects the MAX_ITERATIONS as 100, and
then chooses a color cycleLength of 10, the colors in their palette
should repeat 10 times from the innermost part of the image to the
outermost part.

Day 3 goals:
- Get color picker working
- Get nice color selection feedback to show up in the color selector
panel, including a value for the cycleLength
- Make the Mandlebrot image render with the selected colors.

**Day 4**:
Style the panels and text to look polished. Attempt to implement color
rotation.

Day 4 goals:
- Make it look good.
- Add a `rotate colors` button to toggle color rotation feature on/off.
- If time: add rotation speed dial to control rate of color rotation.


### Bonus features

There are many enhancements that could make this fractalscope even
better:

- [ ] timed color rotation
- [ ] enhance color picking selection details
- [ ] display corresponding Julia sets
