/*
*Date: 2013-10-06
*Email:520ued.com@gmail.com
*Visit http://www.520ued.com/UE/ for more info.
*(c) 2013-2014 owenhong, http://www.520ued.com/
*github:https://github.com/owen-hong/UE
*versions:1.0.0
*/
UE.Ajax = (function(){
    'use strict';
    
    var ajaxQueue;

    return {
        queue : function(ajaxOpts){

            ajaxQueue = $({});

            var jqXHR,
                dfd = $.Deferred(),
                promise = dfd.promise();

            // run the actual query
            function doRequest(next) {
                jqXHR = $.ajax(ajaxOpts);
                jqXHR.done(dfd.resolve)
                    .fail(dfd.reject)
                    .then(next,next);
            }

            // queue our ajax request
            ajaxQueue.queue(doRequest);

            // add the abort method
            promise.abort = function(statusText) {

                // proxy abort to the jqXHR if it is active
                if (jqXHR) {
                    return jqXHR.abort(statusText);
                }

                // if there wasn't already a jqXHR we need to remove from queue
                var queue = ajaxQueue.queue(),
                    index = $.inArray(doRequest,queue);

                if (index > -1) {
                    queue.splice(index, 1);
                }

                // and then reject the deferred
                dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
                return promise;
            };
            return promise;
        },
    }
})();