zul.googlecharts.GoogleChart = zk.$extends(zk.Widget, {

        _chartData: '',
        _chartOptions: '',

        $define: {
            chartData: [
                function (data) {
                    return data; // TODO this shouldn't be necessary!?
                },
                function () {
                    console.log('Setting data: ' + this._chartData);
                    // TODO if options exists, redraw
                    if (this.desktop) this.rerender();
                }
            ],
            chartOptions: [
                function (options) {
                    return options; // TODO this shouldn't be necessary!?
                },
                function () {
                    console.log('Setting options: ' + JSON.stringify(this._chartOptions));
                    // TODO if data exists, redraw
                    if (this.desktop) this.rerender();
                }
            ]
        },
        $init: function () {
            console.log('GoogleChart.$init()');
            this.$supers(zul.googlecharts.GoogleChart, '$init', arguments);
            if (!zul.googlecharts.GoogleChart.googleLoaded && !zul.googlecharts.GoogleChart.googleLoading) {
                console.log('Loading Google APIs..');
                google.load('visualization', '1', {
                    'packages': ['corechart'],
                    'callback': zul.googlecharts.GoogleChart._onLoad
                });
                zul.googlecharts.GoogleChart.googleLoading = true;
            } else {
                console.log('Google APIs have already been loaded.');
            }
        },

        // protected //

        drawChart_: function (chart) {
            var data = new google.visualization.DataTable(this._chartData);
            chart.draw(data, this._chartOptions);
        },
        container_: function () {
            return document.getElementById(this.uuid);
        },
        bind_: function () {
            console.log('Binding GoogleChart (googleLoaded=' + zul.googlecharts.GoogleChart.googleLoaded + ')');
            this.$supers(zul.googlecharts.GoogleChart, 'bind_', arguments);
            console.log('Bound GoogleChart.');
        },
        unbind_: function () {
            console.log('Unbinding GoogleChart (googleLoaded=' + zul.googlecharts.GoogleChart.googleLoaded + ')');
            this.$supers(zul.googlecharts.GoogleChart, 'unbind_', arguments);
            console.log('Unbound GoogleChart.');
        }

    },
    {
        googleLoading: false,
        googleLoaded: false,

        addOnLoadCallback: function (f) {
            console.log('Registering onLoad callback..');
            zul.googlecharts.GoogleChart._onLoadCallbacks.push(f);
            console.log('onLoad callbacks: ' + zul.googlecharts.GoogleChart._onLoadCallbacks.length);
        },

        _onLoadCallbacks: [],

        _onLoad: function () {
            zul.googlecharts.GoogleChart.googleLoading = false;
            zul.googlecharts.GoogleChart.googleLoaded = true;
            console.log('Google APIs loaded!');
            console.log('googleLoaded=' + zul.googlecharts.GoogleChart.googleLoaded);
            var l = zul.googlecharts.GoogleChart._onLoadCallbacks.length;
            console.log('Executing ' + l + ' queued callbacks..');
            for (var i = 0; i < l; i++) {
                var f = zul.googlecharts.GoogleChart._onLoadCallbacks[i];
                console.log('Executing ' + f);
                f();
            }
            console.log('Done executing queued callbacks.');
        }

    });