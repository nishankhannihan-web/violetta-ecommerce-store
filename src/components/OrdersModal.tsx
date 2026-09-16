import React from 'react';
import { OrderConfirmation } from '../types';
import { X, Package, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderConfirmation[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E9E5F5] overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E9E5F5] flex items-center justify-between bg-[#F7F5FC]/50">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#7C3AED]" />
            <h3 className="font-extrabold text-base text-[#1F1B2E]">
              My Orders & Shipments
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B7280] hover:text-[#1F1B2E] hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-violet-50 text-[#7C3AED] flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-[#1F1B2E]">No current active orders</h4>
              <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
                Once you complete a purchase, your real-time tracking numbers and delivery updates appear right here.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.orderId}
                className="p-4 rounded-2xl bg-[#F7F5FC] border border-[#E9E5F5] space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#E9E5F5] pb-2">
                  <div>
                    <span className="text-xs font-black text-[#7C3AED]">{ord.orderId}</span>
                    <span className="text-[11px] text-[#6B7280] ml-2">{ord.date}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>In Transit</span>
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[#1F1B2E]">
                      <span className="truncate max-w-[200px]">{item.quantity}x {item.product.name}</span>
                      <span className="font-bold">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E9E5F5] text-xs">
                  <span className="text-[#6B7280]">Est. Delivery: <strong className="text-[#1F1B2E]">{ord.estimatedDelivery}</strong></span>
                  <span className="font-black text-sm text-[#7C3AED]">${ord.total}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E9E5F5] bg-white text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-bold"
          >
            Close Orders
          </button>
        </div>

      </div>
    </div>
  );
};
