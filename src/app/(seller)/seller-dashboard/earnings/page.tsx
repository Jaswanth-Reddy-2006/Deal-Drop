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
            {/* ── Page Actions ── */}
            <div className="flex justify-end items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-4 rounded-full bg-white text-[#1E4D35] font-black shadow-sm border border-[#1E4D35]/5 hover:bg-[#F5F7F6] transition-all text-sm">
                    <Download size={16} /> Export Statement
                </button>
            </div>

            {/* Balances */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#1E4D35] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5E74E]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F5E74E]/20 transition-all" />
                    <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Available Balance</p>
                    <h2 className="text-4xl font-black font-display text-[#F5E74E]">$4,850.00</h2>
                    <button className="mt-8 px-8 py-4 bg-[#F5E74E] text-[#1E4D35] font-black rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">
                        Withdraw Now
                    </button>
                </div>

                <div className="bg-white border border-[#1E4D35]/5 rounded-[32px] p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[#1E4D35]/30 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Pending Clearance</p>
                        <h2 className="text-3xl font-black font-display text-[#1E4D35]">$1,240.00</h2>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                                <ArrowUpRight size={12} /> +15.2%
                            </span>
                            <span className="text-[12px] font-bold text-[#1E4D35]/40 leading-none">vs last week</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-[#1E4D35]/5 rounded-[32px] p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[#1E4D35]/30 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Total Earnings (YTD)</p>
                        <h2 className="text-3xl font-black font-display text-[#1E4D35]">$45,200.00</h2>
                    </div>
                    <div className="flex items-center gap-4 mt-6 text-[#1E4D35] font-bold bg-[#F5F7F6] p-4 rounded-2xl border border-transparent">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1E4D35]/30">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-widest opacity-40">Payout Method</p>
                            <p className="text-[13px] font-bold">Bank •••• 4589</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-[40px] border border-[#1E4D35]/5 shadow-sm p-10">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black font-display text-[#1E4D35] flex items-center gap-3">
                        <History size={24} className="text-[#1E4D35]/20" /> Payout History
                    </h3>
                </div>

                <div className="space-y-4">
                    {payouts.map((payout, i) => (
                        <div key={payout.id} className="flex items-center justify-between p-6 bg-[#F5F7F6] rounded-[24px] hover:bg-[#F5E74E]/5 border border-transparent hover:border-[#F5E74E]/30 transition-all group">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#1E4D35] group-hover:bg-[#1E4D35] group-hover:text-[#F5E74E] transition-all">
                                    <DollarSign size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-[#1E4D35] text-[15px]">{payout.date}</p>
                                    <p className="text-[11px] font-black text-[#1E4D35]/20 uppercase tracking-widest">{payout.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black font-display text-[#1E4D35]">${payout.amount.toFixed(2)}</p>
                                <p className="text-[11px] font-black text-green-600 uppercase tracking-widest mt-1">{payout.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
