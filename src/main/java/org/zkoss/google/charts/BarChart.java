package org.zkoss.google.charts;

/**
 * <p>
 * Wrapper of the <a href= "https://developers.google.com/chart/interactive/docs/gallery/barchart">Bar Chart</a>
 * visualization provided in Google Charts.
 * </p>
 *
 * @author Sean Connolly
 */
public class BarChart extends GoogleCoreChart {

	private static final String COLORS = "colors";
	private static final String IS_STACKED = "isStacked";

	public String[] getColors() {
		return getOption(COLORS, new String[0], String[].class);
	}

	public void setColors(String... colors) {
		setOption(COLORS, colors);
	}

	public boolean isStacked() {
        return Boolean.valueOf((String) getOption(IS_STACKED, Boolean.FALSE));
    }
	
	public void setStacked(boolean isStacked){
	    setOption(IS_STACKED, Boolean.toString(isStacked));
	}

}
