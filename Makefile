.PHONY: client-install client public

client-install:
	brew install android-platform-tools
	adb devices
	cd apps/main-xr && npm install

client:
	adb reverse tcp:5173 tcp:5173
	cd apps/main-xr && npm run dev

public:
	ngrok http 5173
