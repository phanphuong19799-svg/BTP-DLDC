import { ArrowRight, ArrowDown } from 'lucide-react';

const processSteps = [
  { id: 'start', label: 'Bắt đầu', type: 'terminal' },
  { id: 'collect', label: 'QLTT-Thu thập', type: 'process' },
  { id: 'process', label: 'XLĐL-Xử lý dữ liệu', type: 'process' },
  { id: 'master', label: 'QLĐMĐC-\nQuản lý danh\nmục đúng chung', type: 'process' },
  { id: 'warehouse', label: 'QTXĐC-Quản trị\nKho Dữ liệu chung', type: 'process' },
  { id: 'open', label: 'QTĐLM-Quản lý\nDữ liệu mở', type: 'process' },
  { id: 'service', label: 'CCDL- Cung\ncấp dịch vụ\ndữ liệu', type: 'process' },
  { id: 'end', label: 'Kết thúc', type: 'terminal' },
];

export function ProcessFlow() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max p-8">
        {/* Row 1: Start -> Collect -> Process -> Warehouse -> Service -> End */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Start */}
          <div className="flex items-center gap-4">
            <div className="bg-white border-2 border-blue-500 rounded-full px-8 py-4 min-w-[120px] text-center">
              <span className="text-gray-800 whitespace-nowrap">Bắt đầu</span>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-500" />
          </div>

          {/* Collect */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg px-6 py-4 min-w-[140px] text-center">
              <span className="text-gray-800 whitespace-nowrap">QLTT-Thu thập</span>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-500" />
          </div>

          {/* Process */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg px-6 py-4 min-w-[140px] text-center">
              <span className="text-gray-800 whitespace-nowrap">XLĐL-Xử lý</span>
              <br />
              <span className="text-gray-800 whitespace-nowrap">dữ liệu</span>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-500" />
          </div>

          {/* Warehouse */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg px-6 py-4 min-w-[160px] text-center relative">
              <span className="text-gray-800 text-sm">QTXĐC-Quản trị</span>
              <br />
              <span className="text-gray-800 text-sm">Kho Dữ liệu chung</span>
              {/* Arrow down */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <ArrowDown className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-500" />
          </div>

          {/* Service */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg px-6 py-4 min-w-[140px] text-center">
              <span className="text-gray-800 text-sm">CCDL- Cung</span>
              <br />
              <span className="text-gray-800 text-sm">cấp dịch vụ</span>
              <br />
              <span className="text-gray-800 text-sm">dữ liệu</span>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-500" />
          </div>

          {/* End */}
          <div className="bg-white border-2 border-blue-500 rounded-full px-8 py-4 min-w-[120px] text-center">
            <span className="text-gray-800 whitespace-nowrap">Kết thúc</span>
          </div>
        </div>

        {/* Row 2: Master and Open Data boxes */}
        <div className="flex items-start justify-center gap-4 relative">
          {/* Spacer to align with Process box */}
          <div className="w-[120px]"></div>
          <div className="w-[140px]"></div>
          <div className="w-[140px]"></div>
          
          {/* Arrow from Start going down */}
          <div className="absolute left-[13%] top-[-120px]">
            <div className="w-0.5 h-20 bg-blue-500"></div>
            <ArrowDown className="w-8 h-8 text-blue-500 -ml-4" />
          </div>

          {/* Master Data */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg px-6 py-4 min-w-[160px] text-center">
              <span className="text-gray-800 text-sm">QLĐMĐC-</span>
              <br />
              <span className="text-gray-800 text-sm">Quản lý danh</span>
              <br />
              <span className="text-gray-800 text-sm">mục đúng chung</span>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-500" />
          </div>

          {/* Open Data */}
          <div className="flex items-center gap-4 ml-12">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg px-6 py-4 min-w-[160px] text-center">
              <span className="text-gray-800 text-sm">QTĐLM-Quản lý</span>
              <br />
              <span className="text-gray-800 text-sm">Dữ liệu mở</span>
            </div>
          </div>

          {/* Arrow from Open Data going right */}
          <div className="absolute right-[23%] top-12">
            <div className="flex items-center">
              <div className="w-24 h-0.5 bg-blue-500"></div>
              <ArrowRight className="w-8 h-8 text-blue-500 -ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
