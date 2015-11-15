$(function () {

	var NumberInput = function ($container) {
		this._init($container);
	};

	/**
	 * @param  {Jquery Object}
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
	 *
	 */
	NumberInput.prototype._increment = function _increment() {
		// Логика инкремента
		var value = this._getValueFromInput();
		var newValue = this._incrementValue(value);

		this._setValue(newValue);
	};

	/**
	 *
	 */
	NumberInput.prototype._decrement = function _decrement() {
		// Логика декремента
		var value = this._getValueFromInput();
		var newValue = this._decrementValue(value);

		this._setValue(newValue);
	};

	/**
	 * @return {String}
	 */
	NumberInput.prototype._getValueFromInput = function _getValueFromInput() {
		return this.$input.val();
	};

	/**
	 * @param  {Number}
	 * @return {String}
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
	 * @param  {Number}
	 * @return {Incremented number}
	 */
	NumberInput.prototype._incrementValue = function _incrementValue(value) {
		return ++value;
	};

	/**
	 * @param  {Number}
	 * @return {Decremented number}
	 */
	NumberInput.prototype._decrementValue = function _decrementValue(value) {
		return --value;
	};

	/**
	 * @param  {String}
	 */
	NumberInput.prototype._showError = function _showError(error) {
		this.$errorArea.html(error);
	};

	/**
	 *
	 */
	NumberInput.prototype._hideError = function _hideError() {
		this.$errorArea.html('');
	};

	/**
	 * @param {Number}
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
	 * @param {Number}
	 */
	NumberInput.prototype._setValueToInput = function _setValueToInput(value) {
		this.$input
			.val(value)
			.trigger('_updated', { value: value });

	};

	/**
	 * @param  {Number}
	 * @return {Object}
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
	 *
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
	 * @param {Number}
	 */
	NumberInput.prototype.setValue = function setValue(value) {
		this._setValue(value);
	};

	/**
	 * @return {[type]}
	 */
	NumberInput.prototype.getValue = function getValue() {
		return this._getValueFromInput();
	};

	$('._js-input-wrapper').each(function () {
		new NumberInput($(this));
	});
});


