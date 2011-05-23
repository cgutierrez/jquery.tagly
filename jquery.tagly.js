;(function($) {

    var defaults = {
        removeContent: 'x',
        removeClass: 'tag-remove',
        fieldName: 'tag',
        listClass: 'tag-list',
        labelClass: 'tag-label',
        newClass: 'tagly-new',

    };

    $.fn.tagly = function(opts) {

        opts = $.extend(defaults, opts);

        return this.each(function() {
            var $this = $(this);

            function addTag() {
                var tagtxt = this.val();

                var tagMarkup = '<span class="' + opts.labelClass + '">' + tagtxt +
                                    '<a class="' + opts.removeClass + '">' + opts.removeContent + '</a>\
                                </span>\
                                <input type="hidden" name="' + opts.fieldName + '[]" value="' + tagtxt + '"/>';

                var $li = this.parent();

                $li.append(tagMarkup);
                this.remove();

                $li.find('.' + opts.removeClass).click(function() {
                    $li.remove();
                });
            }

            function addNew() {
                var tagMarkup = '<li>\
                                    <input type="text" class="' + opts.newClass + '"/>\
                                 </li>';

                $newTag = this.append(tagMarkup).find('.' + opts.newClass);
                $newTag.bind('keydown', onNewKeydown).focus();
            }

            function onNewKeydown(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    addTag.apply($newTag);
                    addNew.apply($list);
                }
            }

            // get the list element containting the tags, if it doesn't exist...create one
            $list = $this.find('ul');
            if (!$list.length) {
                $list = $this.append('<ul class="' + opts.listClass + '">').find('ul');
            }

            addNew.apply($list);

            $this.click(function() {
                $this.find('.' + opts.newClass).focus();
            });
        });
    };
})(jQuery);