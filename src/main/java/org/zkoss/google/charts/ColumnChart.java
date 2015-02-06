package org.zkoss.google.charts;

/**
 * <p>
 * Wrapper of the <a href= "https://developers.google.com/chart/interactive/docs/gallery/barchart">Bar Chart</a>
 * visualization provided in Google Charts.
 * </p>
 *
 * @author Sean Connolly
 */
public class ColumnChart extends GoogleChart {

	private static final String COLORS = "colors";

	public String[] getColors() {
		return getOption(COLORS, new String[0], String[].class);
	}

	public void setColors(String... colors) {
		setOption(COLORS, colors);
	}

}
