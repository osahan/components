export function createCustomVariables(config) {
    let styles = [];
    if (config.style) {
        const styleConfig = config.style;

        function makeStyleString(arr, keyPrefix = []) {
            arr.forEach(item => {
                if (item[1] && typeof item[1] === 'string') {
                    let _prefix = [].concat(keyPrefix, item[0]);
                    styles.push(['--' + _prefix.join('-'), item[1]].join(':'));
                } else {
                    let _prefix = [].concat(keyPrefix, item[0]);
                    makeStyleString(Object.entries(item[1]), _prefix);
                }
            }, []);
        }

        Object.entries(styleConfig).forEach(group => {
            makeStyleString(Object.entries(group[1]), [group[0]]);
        });
        return styles.join(';');
    }
}