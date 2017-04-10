# Undertone Remake
A remake of [Undertone](https://github.com/aebaack/undertone), a previous project I worked on. 

I wanted to have a simpler design and turn Undertone into a single page application using React.

# Undertone: Poetry in Color
[Undertone](http://undertone-remake.surge.sh/) is a website for adding a visual component to the presentation of poetry. A user is able to search for poems available through the [poetryDB API](http://poetrydb.org/index.html) and is presented with a stanza-by-stanza visual presentation of the poetry based on tone analysis data for the poem.

![analysis](/readme/analysis.png)

The colors in the background shift depending on the tones of the entire poem and the current stanza. Tones are analyzed using [IBM Watson Tone Analyzer](http://www.ibm.com/watson/developercloud/tone-analyzer.html), and the shapes moving on the screen are generated using [particles.js](http://vincentgarreau.com/particles.js/).

## Usage
### Selecting a Poet
A user can input the name of a poet and select the specific poet from a dropdown list below the input search. The only poets currently available are from the poetryDB API. 
![homepage](/readme/home.png)

The top results matching the search criteria will appear.
![search](/readme/search.png)

Clicking on the poet will pull up a list of all poems by the selected poet.

### Selecting a Poem
Clicking on the name of a poem displays the poem in its entirety.
![list](/readme/list.png)

Pressing the arrow to the right of the name of a poem will select the current poem for analysis.

### Analysis
The selected poem will be displayed stanza-by-stanza, with the background color of the page changing based on the current analyzed tone of the poem.
![analysis](/readme/analysis2.png)

The left and right arrows on the screen can be used to switch between stanzas of the poem.
Keyboard arrow keys include this functionality as well. Each stanza has a tone which displays in the upper right corner along
with the overall tone of the poem.

Pressing the "X" in the upper left corner will take the user back to the homepage.
