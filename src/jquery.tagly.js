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
        labelTextClass: 'tag-label-text',
        newClass: 'tagly-new',
    };

    var Tagly = function($container, opts) {
        
        this.$container = $container.data('tagly', this);
        this.$list = $container.find('ul');
        this.opts = opts;

        // get the list element containting the tags, if it doesn't exist...create one
        if (!this.$list.length) {
            this.$list = $('<ul class="' + opts.listClass + '">').appendTo($container[0]);
        }

        this.startNew();

        // focus on the input when the container is clicked
        var self = this;
        $container.click(function() {
            $(this).find('.' + self.opts.newClass).focus();
        });
    };

    Tagly.prototype.addTag = function(val) {

        var opts = this.opts,
            $container = this.$container,
            $lastli = this.$container.find('li:last');
            
        var markup = '<li>\
                        <span class="' + opts.labelClass + '">\
                        <span class="' + opts.labelTextClass + '">'+ val + '</span>\
                        <a class="' + opts.removeClass + '">' + opts.removeContent + '</a>\
                    </span>\
                    <input type="hidden" name="' + opts.fieldName + '[]" value="' + val + '"/>\
                    </li>';

        $lastli.before(markup);
        $lastli.find('input').val("");
        
        $lastli.prev().find('.' + opts.removeClass).bind('click.tagly', function(e) {
            $(this).parents('li').remove();
        });
    };
    
    
    Tagly.prototype.startNew = function() {
        
        var opts = this.opts,
            $list = this.$list;
        
        var markup = '<li>\
                        <input type="text" class="' + opts.newClass + '"/>\
                      </li>';

        var $input = $list.append(markup).find('.' + opts.newClass),
            self = this;
            
        $input.bind('keydown.tagly', function(e) {
            if (e.keyCode === 13 || e.keyCode === 9) {
                e.preventDefault();
                self.onNewKeydown();
            }
        }).focus();
    };
     
    Tagly.prototype.onNewKeydown = function() {
        var opts = this.opts,
            $input = this.$list.find('.' + opts.newClass);

        if ($.trim($input.val()).length) {
            this.addTag($input.val());
        }
    };

    Tagly.prototype.populate = function(tags) {
        var self = this;
        $.each(tags, function(i, tag) {
            self.addTag(tag);
        });
    };

    $.fn.tagly = function() {
        var args = arguments,
            cmd = (args.length) ? args[0] : {},
            cmdtype = typeof cmd;
        
        if (cmdtype === "object" || !cmd) {
            return this.each(function(i, elem) {
                (new Tagly($(elem), $.extend(defaults, cmd || {})));
            });
        } else if(cmdtype === "string" && cmd in Tagly.prototype) {
            return this.each(function(i, elem) {
                var tagly = $(elem).data('tagly');
                tagly[cmd].apply(tagly, Array.prototype.slice.call(args, 1));
            });
        }
    };
})(jQuery);