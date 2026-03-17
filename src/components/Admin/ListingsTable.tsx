import React from 'react';
import { ListingItem, ListingStatus } from '../../types';
import { Badge } from '../Shared/Badge';
import { Button } from '../Shared/Button';
import { Trash2, Edit2, Eye, EyeOff } from 'lucide-react';

interface ListingsTableProps {
  items: ListingItem[];
  onDelete: (id: string) => void;
  onToggleStatus: (item: ListingItem) => void;
  onEdit: (item: ListingItem) => void;
}

export const ListingsTable: React.FC<ListingsTableProps> = ({
  items,
  onDelete,
  onToggleStatus,
  onEdit,
}) => {
  if (items.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
        <p className="text-gray-500">No listings yet.</p>
        <p className="text-sm text-gray-400">Upload your first item to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src={item.image_urls[0] || ''} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className={`text-sm font-medium ${item.status === ListingStatus.Sold ? 'text-gray-400' : 'text-gray-900'}`}>{item.title}</div>
                      <div className={`text-sm truncate max-w-xs ${item.status === ListingStatus.Sold ? 'text-gray-300' : 'text-gray-500'}`}>{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className={`text-sm ${item.status === ListingStatus.Sold ? 'text-gray-400' : 'text-gray-900'}`}>
                    {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge status={item.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleStatus(item)}
                      title={item.status === ListingStatus.Available ? 'Mark as Sold' : 'Mark as Available'}
                      >
                      {item.status === ListingStatus.Available ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(item)}
                      title="Edit Listing"
                    >
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
