
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

const Saved: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bone pt-32 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/')} className="hover:bg-zinc-200 p-2 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-dark" />
                    </button>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-dark">Saved Items</h1>
                </div>

                <div className="text-center py-32 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-6">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto">
                        <Heart size={32} className="text-zinc-300" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-black uppercase tracking-widest text-dark">Your Archive is Empty</h2>
                        <p className="text-zinc-400 text-xs font-medium tracking-wide">Items you save will appear here for quick access.</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-dark text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors"
                    >
                        Explore Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Saved;
