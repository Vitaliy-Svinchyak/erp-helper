class StatisticCollector {
    logInputChange(input) {
        // do not log changes of our textarea for copy
        if (input.classList.contains('form-changes')) {
            return;
        }

        const message = {
            name: input.name,
            value: input.value,
            page: window.location.pathname,
        };


        window.erpHelperPort.postMessage(
            {
                'class': 'erpStatistic',
                'method': 'logInputChange',
                'data': message
            }
        );
    }
}