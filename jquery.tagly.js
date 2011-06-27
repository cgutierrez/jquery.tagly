/**
 * Copyright (c) 2011 Chris Gutierrez, http://jquery.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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