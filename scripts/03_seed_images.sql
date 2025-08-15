-- Insert product images by matching product names
INSERT INTO product_images (product_id, image_url, alt_text, is_primary)
SELECT 
  p.id,
  '/placeholder.svg?height=300&width=300&text=' || REPLACE(p.name, ' ', '+'),
  p.name || ' - ' || p.description,
  true
FROM products p
WHERE p.name IN (
  'Digital Thermometer Pro',
  'Blood Pressure Monitor', 
  'Pulse Oximeter',
  'Heating Pad Therapy',
  'Compression Socks',
  'Nebulizer Machine',
  'Ice Pack Therapy Set',
  'Blood Glucose Monitor Kit',
  'First Aid Kit Complete',
  'Orthopedic Pillow'
);

-- Verify the insert worked
SELECT 
  p.name,
  pi.image_url,
  pi.is_primary
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
ORDER BY p.name;
