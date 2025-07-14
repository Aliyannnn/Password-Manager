import React, { useState, useEffect, useRef } from 'react';

const PasswordList = ({ passwords, handleDelete, handleEdit }) => {
    const [visibleIndex, setVisibleIndex] = useState(null);
    const eyeRefs = useRef([]);

    const toggleVisibility = (index) => {
        setVisibleIndex(visibleIndex === index ? null : index);
        eyeRefs.current[index]?.play?.();
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 px-4 z-10 relative">
            <h2 className="text-2xl font-semibold text-white mb-6">Your Passwords</h2>
            <div className="space-y-4">
                {passwords.length === 0 ? (
                    <p className="text-gray-400">No matching passwords found.</p>
                ) : (
                    passwords.map((entry, index) => (
                        <div
                            key={index}
                            className="bg-slate-900/60 border border-white/10 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                        >
                            <div>
                                <p className="text-white font-medium">{entry.site}</p>
                                <p className="text-gray-400 text-sm">{entry.user}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="text-pink-400 font-mono">
                                    {visibleIndex === index ? entry.password : '•'.repeat(8)}
                                </p>

                                <div onClick={() => toggleVisibility(index)} className="cursor-pointer">
                                    <lord-icon
                                        ref={(el) => (eyeRefs.current[index] = el)}
                                        src="https://cdn.lordicon.com/dicvhxpz.json"
                                        trigger="click"
                                        stroke="bold"
                                        colors="primary:#ffffff,secondary:#ffffff"
                                        style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                                        onClick={() => toggleVisibility(index)}
                                    ></lord-icon>
                                </div>

                                {/* Edit Icon */}
                                <lord-icon
                                    src="https://cdn.lordicon.com/wkvacbiw.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                                    onClick={() => handleEdit(index)}
                                ></lord-icon>

                                {/* Delete Icon */}
                                <lord-icon
                                    src="https://cdn.lordicon.com/kfzfxczd.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                                    onClick={() => handleDelete(index)}
                                ></lord-icon>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PasswordList;
