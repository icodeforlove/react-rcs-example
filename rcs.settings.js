(function (root) {
	function RCSPropertiesInit (Properties) {
		Properties.setBaseUrl('http://todomvc.com/architecture-examples/react/bower_components/todomvc-common/');

		// defaulting number values to px values
		Properties.registerProperty(/.*/, function (name, value) {
			var stringValue = String(value),
				numberPropertyKeys = /^(?:column-count|fill-opacity|flex|flex-grow|flex-shrink|font-weight|line-height|line-clamp|opacity|order|orphans|widows|z-index|zoom)$/,
				numberValues = /^([a-z0-9.\-]+) ?(?:([a-z0-9.\-]+) ?)?(?:([a-z0-9.\-]+) ?)?(?:([a-z0-9.\-]+) ?)?$/;

			if (name.match(numberPropertyKeys) || !numberValues.test(stringValue)) {
				// property is not supported, or value doesnt match the required format
				return;
			}

			// replace all numbers with pixels
			stringValue = stringValue.replace(numberValues, function (string, first, second, third, fourth) {
				return [first, second, third, fourth].map(function (item) {
					if (String(parseFloat(item)) !== String(item)) {
						return item;
					}

					return item + 'px';
				}).join(' ').trim();
			});

			if (value === stringValue) {
				// nothing changed...
				return;
			}

			return {
				name: name,
				value: stringValue
			};
		});

		// support crossbrowser css gradients
		Properties.registerProperty('background', function (name, value) {
			var matches = value.match(/^gradient\(([a-z]+\(.+\)|.+?), ([a-z]+\(.+\)|.+?)\)/);

			if (!matches) {
				return;
			}

			var from = matches[1],
				to = matches[2],
				results = [];

			results.push({
				name: 'background',
				value: '-webkit-gradient(linear, left top, left bottom, from(' + from + '), to(' + to + '))'
			});
			results.push({
				name: 'background',
				value: '-moz-linear-gradient(top, ' + from + ', ' + to + ')'
			});
			results.push({
				name: 'background',
				filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#{' + from + '}\', endColorstr=\'#{' + to + '}\')'
			});

			return results;
		});
		Properties.registerStandardPrefixedProperties(['align-content', 'align-items', 'align-self', 'alt', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'backface-visibility', 'background-clip', 'background-composite', 'background-origin', 'background-size', 'border-after', 'border-after-color', 'border-after-style', 'border-after-width', 'border-before', 'border-before-color', 'border-before-style', 'border-before-width', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-end', 'border-end-color', 'border-end-style', 'border-end-width', 'border-fit', 'border-image', 'border-radius', 'border-start', 'border-start-color', 'border-start-style', 'border-start-width', 'border-top-left-radius', 'border-top-right-radius', 'box-align', 'box-decoration-break', 'box-flex', 'box-flex-group', 'box-lines', 'box-ordinal-group', 'box-orient', 'box-pack', 'box-reflect', 'box-shadow', 'box-sizing', 'clip-path', 'column-axis', 'column-break-after', 'column-break-before', 'column-break-inside', 'column-count', 'column-fill', 'column-gap', 'column-progression', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'dashboard-region', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'flow-from', 'flow-into', 'font-size-delta', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-start', 'grid-row', 'grid-row-end', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'justify-content', 'line-clamp', 'logical-height', 'logical-width', 'margin-after', 'margin-after-collapse', 'margin-before', 'margin-before-collapse', 'margin-bottom-collapse', 'margin-collapse', 'margin-end', 'margin-start', 'margin-top-collapse', 'marquee', 'marquee-direction', 'marquee-increment', 'marquee-repetition', 'marquee-speed', 'marquee-style', 'mask', 'mask-box-image', 'mask-box-image-outset', 'mask-box-image-repeat', 'mask-box-image-slice', 'mask-box-image-source', 'mask-box-image-width', 'mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-position', 'mask-position-x', 'mask-position-y', 'mask-repeat', 'mask-repeat-x', 'mask-repeat-y', 'mask-size', 'mask-source-type', 'max-logical-height', 'max-logical-width', 'min-logical-height', 'min-logical-width', 'opacity', 'order', 'padding-after', 'padding-before', 'padding-end', 'padding-start', 'perspective', 'perspective-origin', 'perspective-origin-x', 'perspective-origin-y', 'region-break-after', 'region-break-before', 'region-break-inside', 'region-fragment', 'shape-image-threshold', 'shape-margin', 'shape-outside', 'svg-shadow', 'tap-highlight-color', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-style', 'touch-callout', 'transform', 'transform-origin', 'transform-origin-x', 'transform-origin-y', 'transform-origin-z', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'user-drag']);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = RCSPropertiesInit;
	} else if (root !== undefined && root.React && root.React.RCS) {
		RCSPropertiesInit(root.React.RCS.Properties);
	} else if (root !== undefined && root.React) {
		React.RCSPropertiesInit = RCSPropertiesInit;
	}
})(typeof window !== 'undefined' ? window : undefined);