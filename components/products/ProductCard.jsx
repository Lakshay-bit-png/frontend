import React from 'react';
import Link from 'next/link';

const ProductCard = ({ userId, product, onDelete }) => {
  const { id, name, price, description, createdBy } = product;

  // ✅ Check ownership (convert to string to avoid ObjectId issues)
  const isOwner = String(userId) === String(createdBy);

  const cardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    opacity: isOwner ? 1 : 0.6, // reduce opacity if not owner
  };

  // Confirm before delete
  const handleDelete = () => {
    if (!isOwner) return; // extra safety
    const confirmed = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (confirmed && onDelete) {
      onDelete(id);
    }
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: '10px' }}>{name}</h3>
      <p>
        <strong>Price:</strong> ${parseFloat(price).toFixed(2)}
      </p>
      <p style={{ fontSize: '0.9em', color: '#555', flexGrow: 1 }}>
        {description.substring(0, 100)}...
      </p>

      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        {/* Edit Link */}
        <Link
          href={isOwner ? `/products/${id}/edit` : '#'}
          style={{
            textDecoration: 'none',
            padding: '8px 12px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '4px',
            cursor: isOwner ? 'pointer' : 'not-allowed',
            pointerEvents: isOwner ? 'auto' : 'none',
          }}
        >
          Edit
        </Link>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          style={{
            padding: '8px 12px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isOwner ? 'pointer' : 'not-allowed',
            pointerEvents: isOwner ? 'auto' : 'none',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
