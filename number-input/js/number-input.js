$(function () {

	var NumberInput = function ($container) {
		this._init($container);
	};

	/**
	 * @param  {Jqusery Object}
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

	NumberInput.prototype._increment = _increment;
	NumberInput.prototype._decrement = _decrement;
	NumberInput.prototype._getValueFromInput = _getValueFromInput;
	NumberInput.prototype._getErrorByCode = _getErrorByCode;
	NumberInput.prototype._incrementValue = _incrementValue;
	NumberInput.prototype._decrementValue = _decrementValue;
	NumberInput.prototype._showError = _showError;
	NumberInput.prototype._hideError = _hideError;
	NumberInput.prototype._setValue = _setValue;
	NumberInput.prototype._setValueToInput = _setValueToInput;
	NumberInput.prototype._checkInputValue = _checkInputValue;
	NumberInput.prototype._bindEvents = _bindEvents;

	NumberInput.prototype.setValue = setValue;
	NumberInput.prototype.getValue = getValue;




	function getValue() {
		return this._getValueFromInput();
	}

	function setValue(value) {
		this._setValue(value);
	}

	function _bindEvents() {
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

	function _increment() {
		// Логика инкремента
		var value = this._getValueFromInput();
		var newValue = this._incrementValue(value);

		this._setValue(newValue);
	};

	function _decrement() {
		// Логика декремента
		var value = this._getValueFromInput();
		var newValue = this._decrementValue(value);

		this._setValue(newValue);
	};

	function _setValue(value) {
		var checkStatus = this._checkInputValue(value);

		if (checkStatus.isValid) {
			this._hideError();
			this._setValueToInput(value);

		} else {
			this._showError(this._getErrorByCode(checkStatus.errorCode));
		}
	};

	function _getValueFromInput() {
		return this.$input.val();
	};

	function _getErrorByCode(errorCode) {
		var errorCodes = {
			'0': 'Непредвиденная ошибка, отсутсвует errorCode',
			'1': 'Введите число',
			'2': 'Нельзя ввести число меньше ' + this.minValue,
			'3': 'Нельзя ввести число больше ' + this.maxValue
		};
		var errorCode = errorCode || '0';

		return errorCodes[errorCode];
	}

	function _incrementValue(value) {
		return ++value;
	};

	function _decrementValue(value) {
		return --value;
	};

	function _showError(error) {
		this.$errorArea.html(error);
	};

	function _hideError() {
		this.$errorArea.html('');
	};

	function _setValueToInput(value) {
		this.$input
			.val(value)
			.trigger('_updated', { value: value });

	};

	function _checkInputValue(value) {

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


	$('._js-input-wrapper').each(function () {
		new NumberInput($(this));
	});
});


