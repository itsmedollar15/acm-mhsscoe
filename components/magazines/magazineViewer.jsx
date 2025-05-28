"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import ReactFlipBook from "react-pageflip";
import { useRouter } from "next/navigation";

const MagazineViewer = ({ magazine }) => {
  const router = useRouter();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [currPage, setCurrPage] = useState(1);
  const [isFullscreen, setFullscreen] = useState(false);
  const bookViewerRef = useRef();
  const bookRef = useRef();

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth - 40,
      height: window.innerHeight - 104,
    });

    window.addEventListener("resize", () => {
      if (document.fullscreenElement) {
        setScreenSize({
          width: window.innerWidth - 40,
          height: window.innerHeight - 40,
        });
      } else {
        setScreenSize({
          width: window.innerWidth - 40,
          height: window.innerHeight - 104,
        });
      }
    });
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      bookViewerRef.current?.requestFullscreen();
    }
    setFullscreen(!document.fullscreenElement);
  };

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
    setCurrPage(
      currPage + (screenSize.width < 640 ? 1 : currPage === 1 ? 1 : 2)
    );
  };

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
    setCurrPage(
      currPage - (screenSize.width < 640 ? 1 : currPage - 2 === 0 ? 1 : 2)
    );
  };

  return (
    <div className="pt-16">
      <div
        className="overflow-hidden relative w-full bg-gradient-to-br from-gray-50 via-white to-gray-100"
        style={{ height: screenSize.height }}
        ref={bookViewerRef}
      >
        <div className="flex absolute top-0 right-0 left-0 z-10 justify-between items-center p-4">
          <Button
            onClick={() => router.back()}
            icon={<ArrowLeftOutlined />}
            type="primary"
            className="!rounded-full"
          >
            Back
          </Button>
          <div className="flex gap-4 items-center">
            <span className="px-4 py-2 text-gray-800 rounded-full backdrop-blur-sm bg-white/80">
              {screenSize.width < 640 ||
              currPage === 1 ||
              currPage === magazine.pages.length
                ? currPage
                : `${currPage}-${currPage + 1}`}
              /{magazine.pages.length}
            </span>
            <Button
              onClick={toggleFullscreen}
              icon={
                isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
              }
              type="primary"
              className="!rounded-full"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </div>

        <div className="absolute w-full h-full" style={{ top: isFullscreen ? 20 : 0 }}>
          <ReactFlipBook
            key={screenSize.width + screenSize.height}
            startPage={currPage - 1}
            className="!mx-auto"
            style={{
              minHeight: 0,
              height: screenSize.height,
            }}
            width={
              screenSize.width > 720
                ? screenSize.width / 3
                : screenSize.width > 640
                ? screenSize.width / 2
                : screenSize.width
            }
            height={screenSize.height}
            usePortrait={screenSize.width < 640}
            ref={bookRef}
            showCover={true}
            useMouseEvents={false}
          >
            {magazine.pages.map((pagePath, pageIndex) => (
              <div
                key={`magazine_page_index_${pageIndex}`}
                className="bg-white"
                style={{
                  width:
                    screenSize.width > 720
                      ? screenSize.width / 3
                      : screenSize.width > 640
                      ? screenSize.width / 2
                      : screenSize.width,
                  height: screenSize.height,
                }}
              >
                <img
                  className="object-contain w-full h-full"
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${pagePath}`}
                  alt={`Page ${pageIndex + 1}`}
                />
              </div>
            ))}
          </ReactFlipBook>
        </div>

        {/* Navigation Buttons */}
        <Button
          onClick={prevPage}
          icon={<DoubleLeftOutlined />}
          disabled={currPage === 1}
          type="primary"
          size="large"
          className="!fixed left-8 top-1/2 -translate-y-1/2 !w-12 !h-12 !rounded-full !flex !items-center !justify-center hover:!scale-110 transition-transform z-50"
        />
        <Button
          onClick={nextPage}
          icon={<DoubleRightOutlined />}
          disabled={currPage >= magazine.pages.length}
          type="primary"
          size="large"
          className="!fixed right-8 top-1/2 -translate-y-1/2 !w-12 !h-12 !rounded-full !flex !items-center !justify-center hover:!scale-110 transition-transform z-50"
        />
      </div>
    </div>
  );
};

export default MagazineViewer;
