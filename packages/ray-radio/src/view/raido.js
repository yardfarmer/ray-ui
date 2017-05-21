import { createElement, Component, PropTypes } from 'rax';
// import { TouchableHighlight, View, Text, Image } from 'nuke-components';
import Icon from 'ray-icon';
import { isWeex, isWeb } from 'universal-env';

import radioStyles from '../styles.js';

class Radio extends Component {
  constructor(props, context) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      checked: props.checked || false,
      value: props.value || ''
    };
  }
  
  componentWillMount() {
    if (this.context.__group__ && this.context.selectedValue == this.props.value) {
      this.setState({
        checked: true
      })
    }
  }

  /**
   * If contextTypes is defined within a component, 
   * the following lifecycle methods will receive an additional parameter, the context object.
   * https://facebook.github.io/react/docs/context.html
   * @param {any} nextProps 
   * @param {any} nextContext 
   * @memberof Radio
   */
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.__group__) {
      if (typeof nextContext === 'object' && nextContext.selectedValue === nextProps.value) {
        this.setState({
          checked: true
        });
      } else {
        this.setState({
          checked: false
        });
      }
    } else {
      if ('checked' in nextProps) {
        let checked = nextProps.checked

        if (checked != this.props.checked) {
          this.setState({
            checked
          })
        }
      }
    }
  }
  
  onChange() {
    const { onChange, value, disabled } = this.props;

    if (disabled) {
      return;
    }

    if (this.context.__group__) {
      this.context.onChange(value, e);
    } else {
      this.setState({
        checked: true
      });
      
      onChange(true);
    }
  }

  render() {
    const { size, style, disabled, type } = this.props;
    let { checked, value } = this.state;
    let wrapCSS = {};
    let iconCSS = {};

    const sizeStyle = radioStyles[RADIO_TYPES[size]];
    const checkedStyle = radioStyles[`radio-${type}-checked`];
    const disabledStyle = radioStyles[`radio-${type}-disabled`];
    const touchCSS = [radioStyles[`${RADIO_TYPES['touch']}-${size}`], style];
    const wrapSize = radioStyles[`radio-wrap-${type}-${size}`];
    const unradioStyle = { ...{ backgroundColor: '#ffffff' }, sizeStyle, wrapSize };

     if (checked) {
            wrapCSS = {...unradioStyle, checkedStyle };
            iconCSS = {...sizeStyle, color: checkedStyle.color };
        } else {
            wrapCSS = unradioStyle;
            iconCSS = {...sizeStyle};
        }
        if (disabled) {
            Object.assign(wrapCSS,disabledStyle);
            Object.assign(iconCSS,{color: disabledStyle.color});
        }
        return <TouchableHighlight style={touchCSS} onPress={this.onChange}>
            <View style={wrapCSS} className="border-fix-1">
                {checked ? <Icon style={iconCSS} name="select" /> : null}
            </View>
        </TouchableHighlight>;
  }

}

Radio.propTypes = {
  checked: PropTypes.boolean,
  size: PropTypes.oneOf(['small', 'medium']),
  disabled: PropTypes.boolean,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['normal', 'list', 'dark']),
  value: PropTypes.string
}

Radio.defaultProps = {
  size: 'medium',
  disabled: false,
  onChange: () => { },
  type: 'normal',
  value: ''
}

Radio.contextTypes = {
  onChange: PropTypes.func,
  __group__: PropTypes.bool,
  selectedValue: PropTypes.any
}

export default Radio;
