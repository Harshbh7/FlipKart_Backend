import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Mock vertical video data with actual product links in database/fallback
const playVideos = [
    {
        id: 'deal1', // Samsung Galaxy F15 5G
        brand: 'Samsung',
        name: 'Galaxy F15 5G (6GB RAM, 128GB)',
        price: 12999,
        originalPrice: 16999,
        discount: 23,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-in-hand-42636-large.mp4',
        likes: '14.2K',
        shares: '2.5K',
        avatar: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100'
    },
    {
        id: 'deal2', // Sony WH-1000XM4
        brand: 'Sony',
        name: 'WH-1000XM4 Noise Cancelling Wireless Headphones',
        price: 19999,
        originalPrice: 29999,
        discount: 33,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-listening-to-music-with-headphones-40030-large.mp4',
        likes: '28.5K',
        shares: '8.1K',
        avatar: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'
    },
    {
        id: 'shoe1', // Action Athleo
        brand: 'Action',
        name: 'Athleo ATG-424 Comfort Running Shoes',
        price: 509,
        originalPrice: 1899,
        discount: 73,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-runner-legs-seen-from-the-side-41662-large.mp4',
        likes: '45.1K',
        shares: '12.4K',
        avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'
    }
];

const Play = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeIdx, setActiveIdx] = useState(0);
    const [likedList, setLikedList] = useState({});

    const handleAddToCart = (e, item) => {
        e.stopPropagation();
        dispatch({
            type: 'cart/addItem',
            payload: {
                _id: item.id,
                name: item.name,
                price: item.price,
                originalPrice: item.originalPrice,
                discount: item.discount,
                image: item.avatar,
                stock: 10,
                quantity: 1,
                seller: 'visionstar@flipkart.com'
            }
        });
        // Visual alert
        alert('Added to Cart!');
    };

    const handleBuyNow = (e, item) => {
        e.stopPropagation();
        dispatch({
            type: 'cart/addItem',
            payload: {
                _id: item.id,
                name: item.name,
                price: item.price,
                originalPrice: item.originalPrice,
                discount: item.discount,
                image: item.avatar,
                stock: 10,
                quantity: 1,
                seller: 'visionstar@flipkart.com'
            }
        });
        navigate('/checkout?mode=buyNow');
    };

    const toggleLike = (idx) => {
        setLikedList(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    return (
        <div className="bg-black min-h-screen text-white flex flex-col items-center justify-start pb-20 select-none">

            {/* Top sticky header tab */}
            <div className="w-full max-w-md bg-gradient-to-b from-black/80 to-transparent p-4 fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-white hover:opacity-80 p-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="flex gap-4 text-sm font-extrabold tracking-wide uppercase">
                    <span className="text-flipkart-blue border-b-2 border-flipkart-blue pb-0.5">Explore Play</span>
                    <span className="text-neutral-400 opacity-60">Trending</span>
                </div>
                <div className="w-8"></div>
            </div>

            {/* Vertical Reels Feed Container */}
            <div className="w-full max-w-md h-[88vh] mt-12 relative overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
                {playVideos.map((item, idx) => {
                    const isLiked = likedList[idx];
                    return (
                        <div
                            key={idx}
                            className="w-full h-full snap-start relative bg-neutral-900 flex items-center justify-center"
                            onClick={() => toggleLike(idx)}
                        >
                            {/* Vertical video layout or animated fallback */}
                            <video
                                src={item.videoUrl}
                                className="w-full h-full object-cover"
                                loop
                                muted
                                autoPlay={idx === activeIdx}
                                playsInline
                                onError={(e) => {
                                    // Fallback animated container if video cannot be fetched
                                    e.target.style.display = 'none';
                                }}
                            />

                            {/* Animated color visual layout when video is muted or fails */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-purple-950 to-neutral-950 z-0 flex flex-col justify-center items-center p-6 text-center">
                                <span className="text-7xl mb-4">🎬</span>
                                <p className="text-xs uppercase tracking-widest text-flipkart-blue font-extrabold">Flipkart Video Showcase</p>
                                <h4 className="text-lg font-black text-white leading-snug mt-2 max-w-xs">{item.name}</h4>
                                <p className="text-xs text-green-400 font-extrabold mt-1">↓{item.discount}% Off • Only ₹{item.price.toLocaleString('en-IN')}</p>
                                <span className="text-[10px] text-neutral-500 font-semibold mt-4">Double-tap to Like</span>
                            </div>

                            {/* Black Gradient overlays for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/85 pointer-events-none z-10" />

                            {/* Right Side Vertical Toolbar */}
                            <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20">
                                {/* Brand Logo Avatar */}
                                <div
                                    className="w-11 h-11 rounded-full border-2 border-white overflow-hidden cursor-pointer shadow-md"
                                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${item.id}`); }}
                                >
                                    <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                                </div>

                                {/* Like Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleLike(idx); }}
                                    className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                                >
                                    <span className={`text-2xl ${isLiked ? 'text-red-500 scale-110' : 'text-white'}`}>
                                        {isLiked ? '❤️' : '🤍'}
                                    </span>
                                    <span className="text-[10px] font-black mt-1">{item.likes}</span>
                                </button>

                                {/* Share Button */}
                                <button className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                    <span className="text-2xl">🔗</span>
                                    <span className="text-[10px] font-black mt-1">{item.shares}</span>
                                </button>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={(e) => handleAddToCart(e, item)}
                                    className="w-10 h-10 rounded-full bg-flipkart-blue text-white flex items-center justify-center shadow-lg border border-white/20 hover:scale-105 transition-transform cursor-pointer"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Bottom Details Overlay */}
                            <div className="absolute left-4 bottom-8 right-16 text-left space-y-3.5 z-20">
                                <div>
                                    <span className="bg-flipkart-blue text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
                                        {item.brand}
                                    </span>
                                    <h3
                                        onClick={() => navigate(`/product/${item.id}`)}
                                        className="text-sm font-black text-white hover:underline cursor-pointer leading-snug line-clamp-2 mt-1.5"
                                    >
                                        {item.name}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-green-400 text-lg font-black">↓{item.discount}%</span>
                                    <span className="text-neutral-400 text-xs line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                                    <span className="text-white text-lg font-black">₹{item.price.toLocaleString('en-IN')}</span>
                                </div>

                                {/* Primary Action Button */}
                                <button
                                    onClick={(e) => handleBuyNow(e, item)}
                                    className="w-full bg-[#ffc200] hover:bg-[#ebd335] text-neutral-900 py-2.5 rounded-lg font-black text-xs cursor-pointer shadow-md transition-colors flex items-center justify-center gap-1.5"
                                >
                                    ⚡ Buy now at ₹{item.price.toLocaleString('en-IN')}
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Play;
