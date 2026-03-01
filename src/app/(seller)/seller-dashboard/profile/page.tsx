"use client";

import { Save, Building, MapPin, Phone, Mail } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-8 page-enter max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-brand-textPrimary font-poppins">Store Profile</h1>
                <p className="text-[15px] text-brand-textSecondary mt-1">Manage your public store presence and business details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                {/* Logo & Banner setup */}
                <div className="col-span-1 border border-brand-border bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center mb-4 relative overflow-hidden group cursor-pointer">
                        <Building className="w-10 h-10 text-gray-300" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold">Edit Logo</span>
                        </div>
                    </div>
                    <h3 className="font-bold font-poppins text-lg">TechNova Hub</h3>
                    <p className="text-sm text-brand-textSecondary mt-1">Since 2023</p>
                    <button className="text-brand-primary text-sm font-bold mt-4 hover:underline">Change store banner</button>
                </div>

                {/* Form fields */}
                <div className="col-span-2 space-y-8">
                    <form className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold font-poppins border-b border-gray-100 pb-4">Business Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Store Name</label>
                                <input type="text" defaultValue="TechNova Hub" className="input w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Store Description / Bio</label>
                                <textarea rows={4} defaultValue="Premium retailer specializing in high-end audio, mechanical keyboards, and minimalist desk setups." className="input w-full resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-brand-textSecondary mb-2">Business Email</label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input type="email" defaultValue="contact@technovahub.store" className="input w-full pl-10" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-textSecondary mb-2">Support Phone</label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input type="tel" defaultValue="+1 (555) 019-8472" className="input w-full pl-10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold font-poppins border-b border-gray-100 pb-4 pt-4">Return Policy & Shipping</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Standard Return Window</label>
                                <select className="input w-full bg-white">
                                    <option>14 Days Policy</option>
                                    <option selected>30 Days Policy</option>
                                    <option>60 Days Policy</option>
                                    <option>No Returns Accepted</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Shipping Origins (Warehouse)</label>
                                <div className="relative">
                                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="text" defaultValue="Austin, Texas (US)" className="input w-full pl-10" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button type="button" className="btn-primary px-8 py-3 w-full sm:w-auto flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
