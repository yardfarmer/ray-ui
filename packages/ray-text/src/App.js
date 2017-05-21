import { createElement, Component, propTypes } from 'rax';
import { isWeex } from 'universal-env';
import styles from './App.css';

class Text extends Component {
  render() {
    let textString = '';
    let props = this.props || {};
    let nativeProps = {
      ...props,
      ...{
        style: props.style
      }
    };

    if (props.children != null) {
      if (Array.isArray(props.children)) {
        textString = props.children.join('');
      } else {
        textString = props.children.toString();
      }
    }

    if (props.onPress || props.onClick) {
      nativeProps.onClick = props.onPress || props.onClick;
    }

    if (isWeex) {
      if (props.numberOfLines) {
        nativeProps.style.lines = props.numberOfLines;
      }
      nativeProps.value = textString;

      return <text {...nativeProps} />;
    } else {
      let styleProps = {
        ...styles.initialWeb,
        ...nativeProps.style
      };
      let numberOfLines = props.numberOfLines;

      if (numberOfLines) {
        if (parseInt(numberOfLines) === 1) {
          styleProps.whiteSpace = 'nowrap';
        } else {
          // https://css-tricks.com/line-clampin/
          styleProps.display = '-webkit-box';
          styleProps.webkitBoxOrient = 'vertical';
          styleProps.webkitLineClamp = String(numberOfLines);
        }

        styleProps.overflow = 'hidden';
      }

      return <span {...nativeProps} style={styleProps}>{textString}</span>;
    }
  }
}

export default Text;
