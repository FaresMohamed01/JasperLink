import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { connectHighlight } from 'react-instantsearch-native';
import { styles } from '../Style';

//Highlights the results of the search after filtered. We still to add a color to the name searched by the user
const Highlight = ({ attribute, hit, highlight }) => {
  const highlights = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <Text>
      {highlights.map(({ value}, index) => {
        return (
          <Text key={index} style = {styles.fontStyle}>
            {value}
          </Text>
        );
      })}
    </Text>
  );
};

Highlight.propTypes = {
  attribute: PropTypes.string.isRequired,
  hit: PropTypes.object.isRequired,
  highlight: PropTypes.func.isRequired,
};

export default connectHighlight(Highlight);