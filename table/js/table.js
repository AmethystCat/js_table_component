;(function(){
	Function.prototype.method = function(name, fn) {
		this.prototype[name] = fn;
		return this;
	};

	var doc = document, id = 'getElementById', celem = 'createElement';

	var Table = function(options) {
		var defaults = {
			columns: [],
			dataSource: [],
			loading: false,
			pagination: {}
		};
		var settings = Object.assign({}, defaults, options || {});
		this.domstr = [];
		this.init(settings);
	};

	Table.method('init', function(settings) {
		var domstr_thead = this.thead(settings.columns);
		// add thead
		var table = doc[id]('table');
		table.innerHTML= domstr_thead;

		// add tbody container
		var tbody_container = doc[celem]('div');
		tbody_container.className = 'tbody';
		tbody_container.id = 'tbody';
		
		// tbody_container.innerHTML = '<div>暂无数据</div>';
		var domstr_tbody = this.tbody(settings.columns, settings.dataSource);
		tbody_container.innerHTML = domstr_tbody;
		table.appendChild(tbody_container);
	});

	Table.method('thead', function(columns) {
		// [{title: '序列号', key: 'id', dataIndex: 'id', render: function(){}}]
		var arr = columns;
		var domarr = arr.map(function(el, index) {
			return '<div class="cell">' + el.title + '</div>';
		});
		
		// add thead container
		domarr.unshift('<div class="row header green">');
		domarr.push('</div>');

		return domarr.join('');
	});

	Table.method('tbody', function(columns, dataSource) {
		var colArr = dataSource,
			data = dataSource;
		if (!data.length) return;

		var domarr = dataSource.map(function(el) {
			var str = columns.map(function(v) {
				return '<div class="cell">' + el[v.dataIndex] + '</div>';
			});
			return '<div class="row">' + str.join('') + '</div>';
		});
		console.log(domarr);
		return domarr.join('');
	});

	Table.method('render', function() {

	});

	window.Table = function(options) {
		new Table(options);
	};
})();