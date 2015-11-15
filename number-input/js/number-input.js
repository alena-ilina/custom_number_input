$(function () {

	var NumberInput = function ($container) {
		this._init($container);
	};

	/**
	 * Initializes input. Sets all dependences
	 * @param {Jquery Object}  Wrapper for input
	 */
	NumberInput.prototype._init = function _init($container) {
		this.$container = $container;
		this.$input = $container.find('._js-number-input');
		this.$incButton = $container.find('._js-input-inc');
		this.$decButton = $container.find('._js-input-dec');
		this.minValue = this.$input.attr('min');
		this.maxValue = this.$input.attr('max');
		this.$errorArea = $container.find('._js-input-error');
		this._bindEvents();
	};

	/**
	 * This is the logic of increment. This function calls functions
	 * to get value from input, increment value and set new value
	 */
	NumberInput.prototype._increment = function _increment() {
		var value = this._getValueFromInput();
		var newValue = this._incrementValue(value);

		this._setValue(newValue);
	};

	/**
	 * This is the logic of decrement. This function calls functions
	 * to get value from input, decrement value and set new value
	 */
	NumberInput.prototype._decrement = function _decrement() {
		var value = this._getValueFromInput();
		var newValue = this._decrementValue(value);

		this._setValue(newValue);
	};

	/**
	 * Get value from input
	 * @return {String}  Value from input
	 */
	NumberInput.prototype._getValueFromInput = function _getValueFromInput() {
		return this.$input.val();
	};

	/**
	 * Get error by code
	 * @param  {Number}  Error code
	 * @return {String}	 Error text
	 */
	NumberInput.prototype._getErrorByCode = function _getErrorByCode(errorCode) {
		var errorCodes = {
			'0': 'Непредвиденная ошибка, отсутсвует errorCode',
			'1': 'Введите число',
			'2': 'Нельзя ввести число меньше ' + this.minValue,
			'3': 'Нельзя ввести число больше ' + this.maxValue
		};
		var errorCode = errorCode || '0';

		return errorCodes[errorCode];
	};

	/**
	 * Increment value
	 * @param  {Number}  Value to increment
	 * @return {Number}  Incremented number
	 */
	NumberInput.prototype._incrementValue = function _incrementValue(value) {
		return ++value;
	};

	/**
	 * Decrement value
	 * @param  {Number}  Value to decrement
	 * @return {Number}  Decremented number
	 */
	NumberInput.prototype._decrementValue = function _decrementValue(value) {
		return --value;
	};

	/**
	 * Show error text
	 * @param {String}  Error code text
	 */
	NumberInput.prototype._showError = function _showError(error) {
		this.$errorArea.html(error);
	};

	/**
	 * Hide error text
	 */
	NumberInput.prototype._hideError = function _hideError() {
		this.$errorArea.html('');
	};

	/**
	 * This is the logic of setting value. This function calls functions
	 * to check value and show result
	 * @param {Number}  Value to set to input
	 */
	NumberInput.prototype._setValue = function _setValue(value) {
		var checkStatus = this._checkInputValue(value);

		if (checkStatus.isValid) {
			this._hideError();
			this._setValueToInput(value);

		} else {
			this._showError(this._getErrorByCode(checkStatus.errorCode));
		}
	};

	/**
	 * Set value to input
	 * @param {Number}  Number to set to input
	 */
	NumberInput.prototype._setValueToInput = function _setValueToInput(value) {
		this.$input
			.val(value)
			.trigger('_updated', { value: value });

	};

	/**
	 * Check value
	 * @param  {Number}  Value form input
	 * @return {Object}  Checking result
	 */
	NumberInput.prototype._checkInputValue = function _checkInputValue(value) {

		if (value < this.minValue) {
			return {
				isValid: false,
				errorCode: '2'
			};
		}

		if (value > this.maxValue) {
			return {
				isValid: false,
				errorCode: '3'
			};
		}

		if (!(isNaN(parseFloat(value)))) {
			return {
				isValid: true,
				errorCode: null
			};
		} else {
			return {
				isValid: false,
				errorCode: '1'
			};
		};
	};

	/**
	 * Bind events
	 */
	NumberInput.prototype._bindEvents = function _bindEvents() {
		this.$incButton.on('click', function () {
			this._increment();
		}.bind(this));

		this.$decButton.on('click', function () {
			this._decrement();
		}.bind(this));

		this.$input.on('_updated', function (e, data) {
			this.$container.trigger('updated', { value: data.value })
		}.bind(this));

		this.$input.on('blur', function (e) {
			// Проверка, что после того, как мы убрали фокус, в инпуте все ок
		});

		this.$input.on('keydown', function (e) {
			var keyCode = e.keyCode;

			switch (keyCode) {
				case 38:
					this._increment();
					break;
				case 40:
					this._decrement();
					break;
			};
		}.bind(this));
	};

	/**
	 * Set value to input
	 * @param {Number}  Value to set to input
	 */
	NumberInput.prototype.setValue = function setValue(value) {
		this._setValue(value);
	};

	/**
	 * Get value from input
	 * @return {String}  Get value from input
	 */
	NumberInput.prototype.getValue = function getValue() {
		return this._getValueFromInput();
	};

	$('._js-input-wrapper').each(function () {
		new NumberInput($(this));
	});
});


