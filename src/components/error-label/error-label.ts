import Block from '@core/block';
import template from './error-label.hbs?raw';
import { APIError } from 'api/type';
import { connect } from '@utils/connect';

interface ErrorLabelProps {
	errorLabel?: APIError;
}

class ErrorLabel extends Block<ErrorLabelProps> {
	constructor(props: ErrorLabelProps) {
		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}

const mapStateToProps = (state: ErrorLabelProps) => ({
	errorLabel: state.errorLabel,
});

export default connect(mapStateToProps)(ErrorLabel);
