.PHONY: icons-to-png clean-icons

ICON_SIZES = 72 96 128 144 152 192 384 512
ICONS_DIR = public/icons
ICON_SVG = public/icon.svg

icons-to-png: $(ICONS_DIR)
	@echo "Converting icon.svg to PNG icons..."
	@for size in $(ICON_SIZES); do \
		echo "Generating icon-$${size}x$${size}.png..."; \
		convert -background none -resize $${size}x$${size} $(ICON_SVG) $(ICONS_DIR)/icon-$${size}x$${size}.png; \
	done
	@echo "All icons generated successfully!"

$(ICONS_DIR):
	@mkdir -p $(ICONS_DIR)

clean-icons:
	@echo "Removing generated PNG icons..."
	@rm -rf $(ICONS_DIR)
	@echo "Icons removed."
