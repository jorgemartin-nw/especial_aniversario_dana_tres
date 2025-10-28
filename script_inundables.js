document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const images = {
        'image-1': document.getElementById('image-1'),
        'image-2': document.getElementById('image-2'),
        'image-3': document.getElementById('image-3'),
        'image-4': document.getElementById('image-4'),
        'image-5': document.getElementById('image-5'),
        'image-6': document.getElementById('image-6'),
        'image-7': document.getElementById('image-7'),
        'image-8': document.getElementById('image-8'),
        'image-9': document.getElementById('image-9'),
    };
    let currentImageId = 'image-1'; 
    
    for (const id in images) {
        if (id !== currentImageId && images[id]) {
            images[id].classList.remove('opacity-100', 'z-10');
            images[id].classList.add('opacity-0', 'z-0');
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepElement = entry.target;
                    stepElement.classList.add('is-active');
                    
                    const newImageId = stepElement.dataset.imageId;
                    
                    if (newImageId && newImageId !== currentImageId) {
                        if (images[currentImageId]) {
                            images[currentImageId].classList.remove('opacity-100', 'z-10');
                            images[currentImageId].classList.add('opacity-0', 'z-0');
                        }
                        if (images[newImageId]) {
                            images[newImageId].classList.add('opacity-100', 'z-10');
                            images[newImageId].classList.remove('opacity-0', 'z-0');
                        }
                        currentImageId = newImageId;
                    }
                } else {
                    entry.target.classList.remove('is-active');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '-30% 0px -30% 0px'
        }
    );
    
    steps.forEach(step => {
        observer.observe(step);
    });
});
