import moment from 'moment-jalaali';
import debounce from 'lodash.debounce';
import { delegate } from 'tippy.js';
import exps from './date-regexes';

const debouncedRun = debounce(run, 1000);

delegate('body', {
    target: '[data-shams-date]',
    content: (reference) => reference.dataset.shamsDate,
    theme: 'shams',
});

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const observer = new MutationObserver(function () {
    debouncedRun();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
});

function toPersian(date) {
    return moment(date).format('jYYYY/jMM/jDD');
}

function run() {
    const els = document.querySelectorAll("body *:not(.shams-highlight, .tippy-content)");
    for (let i = 0; i < els.length; i++) {
        if (els[i].children.length === 0)
            for (const exp of exps)
                if (exp.test(els[i].innerText))
                    els[i].innerHTML = els[i].innerHTML.replace(exp, r => `<span class="shams-highlight" data-shams-date="${toPersian(r)}">${r}</span>`)

    }
}