"use client";

import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, ArrowDownRight, Download, History, CreditCard } from "lucide-react";

export default function EarningsPage() {
    const payouts = [
        { id: "PAY-182", date: "Oct 24, 2023", amount: 4850.00, status: "Processed" },
        { id: "PAY-181", date: "Oct 17, 2023", amount: 3200.50, status: "Processed" },
        { id: "PAY-180", date: "Oct 10, 2023", amount: 2950.00, status: "Processed" },
        { id: "PAY-179", date: "Oct 03, 2023", amount: 1450.25, status: "Processed" },
    ];

    return (
        <div className="space-y-8 page-enter">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-brand-textPrimary font-poppins">Earnings & Payouts</h1>
                <p className="text-[15px] text-brand-textSecondary mt-1">Manage your store revenue and track upcoming payouts.</p>
            </div>

            {/* Balances */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-brand-primary rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <p className="text-white/80 font-bold uppercase tracking-widest text-sm mb-2">Available Balance</p>
                    <h2 className="text-5xl font-black font-poppins">$4,850.00</h2>
                    <button className="mt-8 px-6 py-3 bg-white text-brand-primary font-bold rounded-xl shadow-lg hover:scale-105 transition-transform w-full sm:w-auto">
                        Withdraw Now
                    </button>
                </div>

                <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm mb-2">Pending Clearance</p>
                        <h2 className="text-4xl font-extrabold font-poppins text-brand-textPrimary">$1,240.00</h2>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[12px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                <ArrowUpRight className="w-3 h-3" /> +15.2%
                            </span>
                            <span className="text-sm font-medium text-brand-textSecondary">vs last week</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm mb-2">Total Earnings (YTD)</p>
                        <h2 className="text-4xl font-extrabold font-poppins text-brand-textPrimary">$45,200.00</h2>
                    </div>
                    <div className="flex items-center gap-3 mt-4 text-brand-textPrimary font-bold bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm">Payout Method</p>
                            <p className="text-xs text-brand-textSecondary font-medium">Bank •••• 4589</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-3xl border border-brand-border shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold font-poppins flex items-center gap-2">
                        <History className="w-5 h-5 text-brand-primary" /> Payout History
                    </h3>
                    <button className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                        <Download className="w-4 h-4" /> Download Statement
                    </button>
                </div>

                <div className="space-y-4">
                    {payouts.map((payout, i) => (
                        <div key={payout.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-primary">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-brand-textPrimary">{payout.date}</p>
                                    <p className="text-sm text-brand-textSecondary">{payout.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black font-poppins text-brand-textPrimary">${payout.amount.toFixed(2)}</p>
                                <p className="text-sm font-bold text-green-600">{payout.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
